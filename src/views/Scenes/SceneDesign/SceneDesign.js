import React, { useRef, useState, useEffect, useReducer } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import _ from 'lodash-es';
import { useHistory } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import MediaItem from 'components/SceneDesignMediaItem';
import Button from 'components/Button';
import Select, { createOption } from 'components/Select';
import SvgIcon from 'components/SvgIcon';
import { useTheme } from 'hooks/useTheme';
import ClockIcon from 'assets/icons/clock.svg';
import AddRegionIcon from 'assets/icons/add_region.svg';
import PictureIcon from 'assets/icons/image.svg';
import PreviewIcon from 'assets/icons/preview.svg';
import UndoIcon from 'assets/icons/undo_scenes.svg';
import SaveIcon from 'assets/icons/save.svg';
import TextIcon from 'assets/icons/text.svg';
import VideoIcon from 'assets/icons/video.svg';
import WebIcon from 'assets/icons/web.svg';
import RegionIcon from 'assets/icons/region.svg';
import CloseIcon from 'assets/icons/cancel.svg';
import {
  setState,
  toggleMuteVideo,
  addToTimeline,
  deleteFromTimeline,
  deleteFromTimelineById,
  concatToTimeline,
  updateTimelineItem,
  updateSceneDuration,
  updateSceneSelect,
  updateScene,
  updateSceneById,
  updateResolution,
  updateSceneBackground,
  deleteTimelineItemsByAdvertisementIds
} from './actions';
import { reducer } from './reducer';
import { messages } from './SceneDesignMessages';
import { useMessages } from './hooks/useMessage';
import Carousel from 'components/SceneDesignCarousel';
import AddImageModal from './SceneDesignImage/AddImageModal';
import AddVideoModal from './SceneDesignVideo/AddVideoModal';
import AddTextModal from './SceneDesignText/AddTextModal';
import AddWebModal from './SceneDesignWeb/AddWebPageModal';
import EditImageModal from './SceneDesignImage/EditImageModal';
import EditVideoModal from './SceneDesignVideo/EditVideoModal';
import { useSceneDesignApi } from './api';
import {
  createWeb,
  createVideo,
  createImage,
  createText,
  createTimelineImageFromCarousel,
  createTimelineVideoFromCarousel
} from './constructors';
import useUndo from './hooks/useUndo';
import { ScenePreview } from '../ScenePreview';
import { SceneDesignStyles } from './SceneDesignStyles';
import { SceneEdit } from '../SceneEdit';
import { NestcaPageHeader } from 'components/NestcaPageHeader';
import { Pages } from 'assets';
import { TextField, MenuItem } from '@material-ui/core';

const DEFAULT_DURATION = 10;
const DEFAULT_SCENE_BG = '#000000';
const PREV_PAGE = '/scenes/list';

const regions = [createOption('region-1', 'Región 1')];

export const calculateDimensions = (aWidth, aHeight, width, height) => {
  let currentWidth = width.toFixed(3),
    currentHeight = height.toFixed(3);
  let scale = 1,
    step = 0.07;

  while (currentWidth > aWidth || currentHeight > aHeight) {
    scale -= step;
    currentWidth *= scale;
    currentHeight *= scale;
    currentWidth = currentWidth.toFixed(3);
    currentHeight = currentHeight.toFixed(3);
  }

  return { width: currentWidth, height: currentHeight };
};

export const SceneDesign = (props) => {
  const id = props.match.params.id;
  const {
    getSceneDesignById,
    getMultimedia,
    getScenes,
    updateTimelineVideoById,
    createTimelineVideo,
    createTimelineImage,
    deleteTimelineItemById,
    createTimelineItem,
    saveTimelineOrders
  } = useSceneDesignApi();
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [preview, setPreview] = useState(false);
  const [
    {
      scenes,
      sceneId,
      region,
      sceneOptions,
      timeline,
      multimedia,
      resolution,
      modal,
      sceneDuration,
      sceneBackground
    },
    dispatch
  ] = useReducer(reducer, {
    sceneId: parseInt(id),
    sceneBackground: DEFAULT_SCENE_BG,
    sceneOptions: [],
    scenes: [],
    region: regions[0].value,
    timeline: [],
    multimedia: [],
    resolution: { width: 500, height: 650 },
    modal: {}
  });
  const { undo, registerOperation } = useUndo({
    addElementFn: (operation) => {
      setIsLoading(true);
      let { media_type } = operation.data;

      createTimelineItem(media_type, operation.data, sceneId)
        .then((result) => {
          let apiItem = _.get(result, 'result.items[0]', {});

          dispatch(addToTimeline({ ...operation.data, ...apiItem }));
        })
        .catch((error) => {
          console.info('[Error creating item (undo operation)]', operation);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    removeElementFn: (operation) => {
      setIsLoading(true);
      let { id, media_type } = operation.data;

      deleteTimelineItemById(id, media_type)
        .then((result) => {
          dispatch(deleteFromTimelineById(operation.data.id));
        })
        .catch((error) => {
          console.info('[Error deleting item (undo operation)]', operation);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  });

  const togglePreview = () => {
    setPreview(!preview);
    history.replace(`/scenes/design/${id}`);
  };
  const regionRef = useRef(null);
  const containerRegionRef = useRef(null);
  const { currentTheme, mode } = useTheme();
  const toggleMenuOpen = () => setMenuOpen(!menuOpen);
  const history = useHistory();
  const { getMsg } = useMessages(messages);

  useEffect(() => {
    loadMultimedia();
    loadScenes();
  }, []);

  useEffect(() => {
    loadTimeline();
  }, [sceneId]);

  useEffect(() => {
    dispatch(updateResolution());
    dispatch(updateSceneBackground());
  }, [sceneId, scenes]);

  useEffect(() => {
    calculateRegionDimensions();
  }, [resolution, menuOpen]);

  useEffect(() => {
    if (!modal) {
      calculateRegionDimensions();
    }
  }, [modal]);

  useEffect(() => {
    dispatch(updateSceneDuration());
  }, [timeline]);

  useEffect(() => {
    dispatch(updateSceneSelect());
  }, [scenes]);

  const calculateRegionDimensions = () => {
    if (
      resolution.width !== 0 &&
      resolution.height !== 0 &&
      regionRef.current &&
      containerRegionRef.current
    ) {
      let { width, height } = calculateDimensions(
        containerRegionRef.current.clientWidth,
        containerRegionRef.current.clientHeight,
        resolution.width,
        resolution.height
      );

      regionRef.current.style.width = `${width}px`;
      regionRef.current.style.height = `${height}px`;
    }
  };

  const loadScenes = async () => {
    let { scenes } = await getScenes();

    dispatch(setState({ scenes }));
  };

  const loadMultimedia = async () => {
    let { multimedia } = await getMultimedia();

    dispatch(
      setState({
        multimedia
      })
    );
  };

  const loadTimeline = async () => {
    if (!sceneId) return;
    setIsLoading(true);
    let { timeline } = await getSceneDesignById(sceneId);

    dispatch(updateScene({ timeline }));
    setIsLoading(false);
  };

  const handleChange = (data) => {
    let scene_Id = data.target ? data.target.value : '';
    dispatch(setState({sceneId:scene_Id}));
  };

  const handleSave = () => {
    setIsLoading(true);
    saveTimelineOrders(timeline)
      .then((result) => {})
      .catch((error) => {
        console.info('[Error update timeline order]', error);
      })
      .finally(() => {
        setIsLoading(false);
        history.push(PREV_PAGE);
      });
  };

  const editTimelineItem = (item) => {
    openModal({ ...item, type: `edit-${item.media_type}` });
  };

  const deleteTimelineItem = (index) => {
    let { id, media_type } = timeline[index];

    setIsLoading(true);
    deleteTimelineItemById(id, media_type)
      .then((result) => {
        registerOperation('remove', Object.assign({}, timeline[index]));
        dispatch(deleteFromTimeline(index));
      })
      .catch((error) => {
        console.info('[Error deleting item]', timeline[index], error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleMute = (index) => {
    updateTimelineVideoById(timeline[index].id, {
      silence: !timeline[index].silence
    })
      .then((result) => {})
      .catch((error) => {
        console.info('[Error update video silence]', error);
      });
    dispatch(toggleMuteVideo(index));
  };

  const handleOnDragEndMedia = (result) => {
    if (!result.destination) return;
    const items = Array.from(timeline);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setState({ timeline: items }));
  };

  const addMultimediaFromCarousel = (id) => {
    let item = multimedia.find((m) => m.id === id);
    let media_type = item.media_type;

    if (item) {
      if (media_type === 'video') {
        setIsLoading(true);
        let videoData = createTimelineVideoFromCarousel(item, sceneId);

        createTimelineVideo(videoData.item)
          .then((result) => {
            let apiItem = _.get(result, 'result.items[0]', {});

            addTimelineItem({
              ...videoData.item,
              media_type,
              ...apiItem,
              ...videoData.fileInfo
            });
          })
          .catch((error) =>
            console.info('[Error add video to timeline]', error)
          )
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(true);
        let imageData = createTimelineImageFromCarousel(item, sceneId);

        createTimelineImage(imageData.item)
          .then((result) => {
            let apiItem = _.get(result, 'result.items[0]', {});

            addTimelineItem({
              ...imageData.item,
              media_type,
              ...apiItem,
              ...imageData.fileInfo
            });
          })
          .catch((error) =>
            console.info('[Error add image to timeline]', error)
          )
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  const addTimelineItem = (item) => {
    if (!item.duration) {
      if (item.media_type !== 'video') {
        item.duration = DEFAULT_DURATION;
      }
    }

    if (item.media_type === 'video' && !item.hasOwnProperty('silence')) {
      item.silence = false;
    }

    registerOperation('add', Object.assign({}, item));
    dispatch(addToTimeline(item));
  };

  const openModal = (data) => {
    dispatch(
      setState({
        modal: {
          ...data,
          scene_id: sceneId,
          timeline_length: timeline.length
        }
      })
    );
  };

  const closeModal = () => dispatch(setState({ modal: '' }));

  const handleAcceptModal = (data) => {
    if (typeof data.resolution_id === 'number') {
      dispatch(updateSceneById(sceneId, data));

      return;
    }

    let isEdit = data.isEdit;

    delete data.isEdit;
    let newTimelineItems = [];

    switch (data.media_type) {
      case 'video':
        if (!isEdit) {
          data.assignedMedia.forEach((item) => {
            newTimelineItems.push(createVideo(item));
          });
        }

        break;
      case 'image':
        if (!isEdit) {
          data.assignedMedia.forEach((item) => {
            newTimelineItems.push(createImage(item));
          });
        }

        break;
      case 'text':
        if (!isEdit) {
          data = createText(data);
        }
        break;
      case 'web':
        if (!isEdit) {
          data = createWeb(data);
        }
        break;
    }

    if (isEdit) {
      dispatch(updateTimelineItem(data));
    } else if (data.media_type === 'video' || data.media_type === 'image') {
      dispatch(concatToTimeline(newTimelineItems));
      dispatch(deleteTimelineItemsByAdvertisementIds(data.adsDeleted));
    } else {
      dispatch(addToTimeline(data));
    }

    closeModal();
  };

  const renderSceneDuration = () => {
    let duration = moment.duration(sceneDuration, 'seconds');

    let durationFormated = [
      duration.hours(),
      duration.minutes(),
      duration.seconds()
    ];

    return durationFormated
      .map((time) => {
        if (time < 10) return `0${time}`;

        return time;
      })
      .join(':');
  };

  const renderModal = () => {
    const { type, ...otherProps } = modal;
    let Modal = null;

    switch (type) {
      case 'image':
        Modal = AddImageModal;
        break;
      case 'video':
        Modal = AddVideoModal;
        break;
      case 'edit-image':
        Modal = EditImageModal;
        break;
      case 'edit-video':
        Modal = EditVideoModal;
        break;
      case 'text':
      case 'edit-text':
        Modal = AddTextModal;
        break;
      case 'web':
      case 'edit-web':
        Modal = AddWebModal;
        break;
      case 'edit-scene':
        Modal = SceneEdit;
        otherProps.id = otherProps.scene_id;
        otherProps.showModal = true;

        break;
      default:
        return null;
    }

    return (
      <Modal
        {...otherProps}
        onAccept={handleAcceptModal}
        onClose={closeModal}
      />
    );
  };

  const getCurrentScene = () => {
    let scene = scenes.find((s) => Number(s.id) === Number(sceneId));

    return scene;
  };

  if (modal.type === 'edit-scene') {
    return renderModal();
  }

  const styles = SceneDesignStyles({ sceneBackground, isLoading });

  return (
    <div className="container-fluid" css={styles}>
      {renderModal()}
      <ScenePreview
        scene={getCurrentScene() || {}}
        timeline={timeline}
        resolution={resolution}
        show={preview}
        onClose={togglePreview}
      />
      <ReactTooltip side="top" type="dark" />
      <NestcaPageHeader
        title="Diseñar escena"
        showCount={false}
        showGoBack={true}
        goBack={() => history.push('/scenes/list')}
        Icon={currentTheme.themeDark ? Pages.ScenePageIconDark : Pages.ScenePageIcon}
      />
      <div className="row nobot-row main-row">
        <div className="col-6 flex around">
          <div className="select-cont">
            {/* <Select
              items={sceneOptions}
              name="sceneId"
              onChange={handleChange}
              value={sceneId}
            /> */}
            <TextField
              select
              name="sceneId"
              placeholder="Seleccionar"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              className={'selectScenes'}
              onChange={handleChange}
              value={sceneId}
            >
              {scenes.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="col-6 flex center">
          <button className="light control">
            <SvgIcon
              src={AddRegionIcon}
              color={currentTheme.texts}
              width={15}
              height={15}
            />
          </button>
          <button
            className="control"
            data-tip={getMsg('editScene')}
            onClick={() => openModal({ type: 'edit-scene' })}
          >
            <SvgIcon
              src={PictureIcon}
              color={'#007CBA'}
              width={20}
              height={16}
            />
          </button>
          <button
            className="control"
            data-tip={getMsg('preview')}
            onClick={togglePreview}
          >
            <SvgIcon
              src={PreviewIcon}
              color={'#007CBA'}
              width={27}
              height={20}
            />
          </button>
          <button className="control" data-tip={getMsg('undo')} onClick={undo}>
            <SvgIcon src={UndoIcon} color={'#007CBA'} width={23} height={10} />
          </button>
          <button
            className="control"
            data-tip={getMsg('save')}
            onClick={handleSave}
          >
            <SvgIcon src={SaveIcon} color={'#007CBA'} width={17} height={17} />
          </button>
        </div>
      </div>

      <div
        className="row row-nobot pr-0 design-container pt-3"
        style={{ height: '70vh' }}
      >
        <div
          className={`${menuOpen ? 'col-8' : 'col-12'} flex center`}
          ref={containerRegionRef}
        >
          <div
            style={{ position: 'absolute', top: '0px', marginLeft: '-6%' }}
            className="clock row"
          >
            <SvgIcon src={ClockIcon} color={'#007CBA'} width={18} height={18} />
            <span className="ml-1 little">{renderSceneDuration()}</span>
          </div>
          <div
            style={{ marginTop: '1rem' }}
            className="region"
            ref={regionRef}
            onClick={toggleMenuOpen}
          >
            <button className="close" onClick={toggleMenuOpen}>
              <SvgIcon
                src={CloseIcon}
                color={'#00FFEE'}
                width={14}
                height={14}
              />
            </button>
            <div className="region-corner">
              <SvgIcon src={RegionIcon} color={currentTheme.emphasis} />
            </div>
          </div>
          <button
            className="btn-toggle"
            onClick={toggleMenuOpen}
            data-tip={getMsg('editTimeline')}
          >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </button>
        </div>

        <div
          className={`col-4 tools ${!menuOpen ? 'd-none' : 'd-block'}`}
          style={{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            boxShadow: '0px 3px 6px #00000029'
          }}
        >
          <div className="loading-spinner">
            <PulseLoader loading={isLoading} color={currentTheme.emphasis} />
          </div>
          <div className="tool-box">
            <div className="col-8">
              <Select
                name="region"
                items={regions}
                onChange={handleChange}
                value={region}
                className="select-dark"
              />
            </div>
            <div className="col-12">
              <p className="timelineWithoutColor">{getMsg('editTimeline')}</p>
            </div>
            <div className="col-12 flex start pt-2">
              <span className="textWithoutColor">{getMsg('addMedia')}</span>
              <button
                className="control"
                data-tip={getMsg('addText')}
                onClick={() => openModal({ type: 'text' })}
              >
                <SvgIcon
                  src={TextIcon}
                  color={'#20B5D3'}
                  width={17}
                  height={17}
                />
              </button>
              <button
                className="control"
                data-tip={getMsg('addImage')}
                onClick={() => openModal({ type: 'image' })}
              >
                <SvgIcon
                  src={PictureIcon}
                  color={'#20B5D3'}
                  width={20}
                  height={16}
                />
              </button>
              <button
                className="control"
                data-tip={getMsg('addVideo')}
                onClick={() => openModal({ type: 'video' })}
              >
                <SvgIcon
                  src={VideoIcon}
                  color={'#20B5D3'}
                  width={17}
                  height={17}
                />
              </button>
              <button
                className="control"
                data-tip={getMsg('addWeb')}
                onClick={() => openModal({ type: 'web' })}
              >
                <SvgIcon
                  src={WebIcon}
                  color={'#20B5D3'}
                  width={17}
                  height={17}
                />
              </button>
            </div>
            <div className="row row-tools">
              <div className="col-12">
                <DragDropContext onDragEnd={handleOnDragEndMedia}>
                  <Droppable droppableId="media">
                    {(provided) => (
                      <ol {...provided.droppableProps} ref={provided.innerRef}>
                        {timeline.map((m, index) => (
                          <Draggable
                            key={index}
                            draggableId={`${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <MediaItem
                                  {...m}
                                  onEdit={() => editTimelineItem(m)}
                                  onDelete={() => deleteTimelineItem(index)}
                                  toggleMute={() => toggleMute(index)}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                      </ol>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <div className="col-12">
                <Carousel
                  items={multimedia}
                  onClickItem={addMultimediaFromCarousel}
                />
              </div>
              <div className="col-12">
                <Button onClick={handleSave} className="px-4 py-2 ml-2 my-2">
                  {getMsg('save')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
