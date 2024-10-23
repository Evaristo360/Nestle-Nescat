import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import _ from 'lodash-es';
import moment from 'moment';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PulseLoader from 'react-spinners/PulseLoader';
//import Modal from 'components/Modal';
import { Modal } from '@material-ui/core';
import { useTheme } from 'hooks/useTheme';
import { createMediaResource } from '../constructors';
import Title from 'components/Title';
import SvgIcon from 'components/SvgIcon';
import PreviewImageDefault from 'assets/preview-image.png';
import DeleteAssinedItemIcon from 'assets/icons/remove-circle-outline.svg';
import AddIcon from 'assets/icons/add.svg';
import DeleteIcon from 'assets/icons/delete.svg';
import UploadIcon from 'assets/icons/upload.svg';
import Button from 'components/Button';
import { isSupportedType, isSupportedSize, formatBytes } from '../validation';
import Input from 'components/Inputs/Input';
import CancelOkModal from 'components/CancelOkModal';
import useModal from 'hooks/useModal';
import Table from 'components/Table';
import SortIcon from 'components/Icons/SortIcon';
import SearchInput from 'components/Inputs/ListFiltersInputs/SearchInput';
import useTable from 'hooks/useTable';
import usePromiseModal from 'hooks/usePromiseModal';
import { useMessages } from '../hooks/useMessage';
import {
  AddMediaModalStyles,
  useMediaModalStyles
} from './AddMediaModalStyles.css';

const AddMediaModal = ({
  onClose = () => {},
  onAccept = (data) => {},
  uploadFileFunc = ({ file, blob, filename }) => {},
  searchFunc = ({ page_number, page_size }) => {},
  addAssignedMediaFunc = (mediaResource, scene_id) => {},
  deleteResourceFunc = (id) => {},
  deleteAssignedMediaFunc = (id) => {},
  media_type = 'image',
  timeline_length = 0,
  messages = {},
  initMediaResources = [],
  initAssignedMedia = [],
  supportedTypes = [],
  maxSizeMB = 50,
  scene_id
}) => {
  const { currentTheme } = useTheme();
  const classes = useMediaModalStyles({ currentTheme });
  const deleteModal = usePromiseModal();
  const { showModal, openModal, title, text, toggleModal } = useModal();
  const { page, pageSize, onChangePage, onChangePageSize } = useTable();
  const [totalFound, setTotalFound] = useState(0);
  const [assignedMedia, setAssignedMedia] = useState(initAssignedMedia);
  const [mediaResources, setMediaResources] = useState(initMediaResources);
  const [filename, setFilename] = useState('');
  const [searchText, setSearchText] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderFrom, setOrderFrom] = useState('');
  const previewMediaRef = useRef(null);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [blob, setBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timelineLength, setTimelineLength] = useState(timeline_length);
  const [adsDeleted, setAdsDeleted] = useState([]);
  const { getMsg } = useMessages(messages);

  const addAdDeleted = (id) =>
    setAdsDeleted((ads) => {
      let newAds = ads.slice();

      newAds.push(id);

      return newAds;
    });

  useEffect(() => {
    if (previewMediaRef.current) {
      previewMediaRef.current.src = PreviewImageDefault;
    }
  }, []);

  useEffect(() => {
    search();
  }, [page, pageSize, orderFrom, orderBy]);

  const handleOnDragEndAssigedMedia = (result) => {
    if (!result.destination) return;
    const items = Array.from(assignedMedia);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
    setAssignedMedia(items);
  };

  const openFileBrowser = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const addAssignedMedia = (item) => {
    setLoading(true);
    addAssignedMediaFunc(item, scene_id, timelineLength)
      .then((result) => {
        setTimelineLength((n) => n + 1);
        setAssignedMedia((assignedMedia) => [
          ...assignedMedia,
          { ...item, ...result }
        ]);
      })
      .catch((error) => {
        console.info('Error adding assigned media', error);
      })
      .finally(() => setLoading(false));
  };

  const deleteAssignedItem = (index) => {
    let newMedia = assignedMedia.filter((m, i) => i !== index);
    let id = assignedMedia[index].id;

    if (id) {
      setLoading(true);
      deleteAssignedMediaFunc(id)
        .then((result) => {
          setTimelineLength((n) => n - 1);
          setAssignedMedia(newMedia);
        })
        .catch((error) => console.info(error))
        .finally(() => setLoading(false));
    }
  };

  const handleChangeFile = (event) => {
    const files = event.target.files;

    if (files[0]) {
      setFile(files[0]);
      let supportedType = isSupportedType(files[0].type, supportedTypes);
      let supportedSize = isSupportedSize(files[0].size, maxSizeMB);

      if (supportedType && supportedSize) {
        let blob = new Blob([files[0]], { type: files[0].type });

        setBlob(blob);
        if (previewMediaRef.current) {
          previewMediaRef.current.src = URL.createObjectURL(blob);
        }
      } else if (!supportedType) {
        openModal(getMsg('invalidType'), getMsg('invalidTypeLong'));
        clearUpload();
      } else if (!supportedSize) {
        openModal(getMsg('invalidSize'), getMsg('invalidSizeLong'));
        clearUpload();
      }
    }
  };

  const search = () => {
    let params = {
      page_number: page,
      page_size: pageSize
    };

    if (orderBy) {
      params.order_by = orderBy;
    }

    if (orderFrom) {
      params.order_from = orderFrom;
    }

    if (searchText) {
      let start_date = moment(searchText);

      if (start_date.isValid()) {
        params.start_date = start_date.toISOString();
      } else {
        params.search_item = searchText;
      }
    }

    searchFunc(params).then(({ mediaResources, totalFound }) => {
      setMediaResources(mediaResources);
      setTotalFound(totalFound);
    });
  };

  const handleUpload = () => {
    if (filename && filenameNotExists(filename)) {
      let duration = null;

      if (
        media_type === 'video' &&
        typeof previewMediaRef.current.duration === 'number'
      )
        duration = previewMediaRef.current.duration.toFixed(2);
      setLoading(true);
      uploadFileFunc({ blob, file, filename, duration, scene_id })
        .then(({ id, name, source, media_type, ...otherProps }) => {
          setMediaResources((mediaResources) => [
            ...mediaResources,
            createMediaResource(otherProps.advertisement_id, media_type, name, source, {
              ...otherProps
            })
          ]);
          setAssignedMedia((assignedMedia) => [
            ...assignedMedia,
            createMediaResource(id, media_type, name, source, {
              ...otherProps
            })
          ]);
          clearUpload();
          openModal(getMsg('fileUploaded'), getMsg('fileUploadedLong'));
        })
        .catch((err) => {
          clearUpload();
          openModal(getMsg('errorUpload'), getMsg('errorUploadLong'));
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (!filename) {
      openModal(getMsg('requiredFilename'));
    } else if (!filenameNotExists(filename)) {
      openModal(getMsg('filenameExists'), getMsg('filenameExistsLong'));
    }
  };

  const deleteResource = (media) => {
    setLoading(true);
    deleteResourceFunc(media.id)
      .then((result) => {
        deleteAssignedResources(media.id);
        addAdDeleted(media.id);
        search();
      })
      .catch((error) => console.info(error))
      .finally(() => setLoading(false));
  };

  const deleteAssignedResources = (advertisement_id) => {
    setAssignedMedia((assignedMedia) =>
      assignedMedia.filter((am) => am.advertisement_id != advertisement_id)
    );
  };

  const filenameNotExists = (filename) => {
    for (let file of mediaResources) {
      if (file.name === filename) {
        return false;
      }
    }

    return true;
  };

  const clearUpload = () => {
    if (previewMediaRef.current)
      previewMediaRef.current.src = PreviewImageDefault;
    setFile(null);
    setBlob(null);
  };

  const toggleOrderFrom = () => {
    setOrderFrom((orderFrom) => (orderFrom === 'asc' ? 'desc' : 'asc'));
  };

  const handleAccept = () => {
    onAccept({ assignedMedia, mediaResources, media_type, adsDeleted });
  };

  const handleDeleteResource = async (media) => {
    let accept = await deleteModal.openModal(getMsg('confirmDelete'));

    if (accept) {
      deleteResource(media);
    }
  };

  const renderImageTable = () => (
    <>
      <thead>
        <tr>
          <th>
            <span onClick={toggleOrderFrom}>
              <SortIcon color={currentTheme.texts} />
              ID
            </span>
          </th>
          <th>
            <span onClick={() => setOrderBy('name')}>
              <SortIcon color={currentTheme.texts} /> NOMBRE
            </span>
          </th>
          <th> RESOLUCIÓN</th>
          <th>
            <span onClick={() => setOrderBy('created_on')}>
              <SortIcon color={currentTheme.texts} /> FECHA DE SUBIDA
            </span>
          </th>
          <th> MINIATURA</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {mediaResources.map((media) => (
          <tr key={media.id}>
            <td>{media.id}</td>
            <td>{media.name}</td>
            <td>{media.resolution}</td>
            <td>{moment(media.created_on).format('DD/MM/YYYY HH:MM')}</td>
            <td>
              <img src={media.source} alt={media.name} />
            </td>
            <td>
              <button onClick={() => addAssignedMedia(media)}>
                <SvgIcon
                  src={AddIcon}
                  width={17}
                  height={17}
                  color={currentTheme.emphasis}
                />
              </button>
              <button onClick={() => handleDeleteResource(media)}>
                <SvgIcon
                  src={DeleteIcon}
                  color={currentTheme.emphasis}
                  width={22}
                  height={16}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );

  const renderVideoTable = () => (
    <>
      <thead>
        <tr>
          <th>
            <span onClick={toggleOrderFrom}>
              <SortIcon color={currentTheme.texts} /> ID
            </span>
          </th>
          <th>
            <span onClick={() => setOrderBy('name')}>
              <SortIcon color={currentTheme.texts} /> NOMBRE
            </span>
          </th>
          <th>
            <span onClick={() => setOrderBy('created_on')}>
              <SortIcon color={currentTheme.texts} /> FECHA DE SUBIDA
            </span>
          </th>
          <th> TIPO</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {mediaResources.map((media) => (
          <tr key={media.id}>
            <td>{media.id}</td>
            <td>{media.name}</td>
            <td>{moment(media.created_on).format('DD/MM/YYYY HH:MM')}</td>
            <td>video</td>
            <td>
              <button onClick={() => addAssignedMedia(media)}>
                <SvgIcon
                  src={AddIcon}
                  // color={currentTheme.emphasis}
                  width={17}
                  height={17}
                />
              </button>
              <button onClick={() => handleDeleteResource(media)}>
                <SvgIcon
                  src={DeleteIcon}
                  // color={currentTheme.emphasis}
                  width={22}
                  height={16}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="add-media-modal"
      aria-describedby="add-multimedia-assets"
      className={classes.root}
    >
      <main>
        <div css={AddMediaModalStyles({ currentTheme })}>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileRef}
            accept={supportedTypes.join(', ')}
            onChange={handleChangeFile}
          />

          <div className="row">
            <div className="col-9 main-box mr-0">
              <header className={classes.headerModal}>
                <Title>{getMsg('title')}</Title>
                <p className={classes.text}>{getMsg('subtitle')}</p>
              </header>
              <div className="col-12 upload-region pl-3">
                <div className="flex center">
                  <PulseLoader
                    loading={loading}
                    color={currentTheme.emphasis}
                  />
                </div>
                {!loading ? (
                  <div
                    className="flex between pt-3"
                    style={{ display: file ? 'flex' : 'none' }}
                  >
                    <div className="flex start">
                      <div className="preview-media mr-4 flex center">
                        {media_type === 'image' ? (
                          <img
                            ref={previewMediaRef}
                            className="img-fluid"
                            alt="preview multimedia"
                          />
                        ) : (
                          <video ref={previewMediaRef}></video>
                        )}
                      </div>
                      <Input
                        name="filename"
                        label={getMsg('labelFile')}
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        maxLength={50}
                        message={getMsg('maxLength')}
                        placeholder={getMsg('placeholderFile')}
                      />
                    </div>
                    <div className="flex between mt-2">
                      <span className="text little">
                        {file ? formatBytes(file.size) : ''}
                      </span>
                      <div>
                        <button onClick={handleUpload}>
                          <SvgIcon
                            src={UploadIcon}
                            color={currentTheme.texts}
                          />
                        </button>
                        <button onClick={clearUpload}>
                          <SvgIcon
                            src={AddIcon}
                            color={currentTheme.texts}
                            rotate={45}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="col-12 px-0 pt-3 pl-3">
                <div className="flex between">
                  <div className="flex between">
                    <SearchInput
                      name="search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={search} className="normal">
                      Buscar
                    </Button>
                  </div>
                  <div className="flex between">
                    <Button
                      onClick={openFileBrowser}
                      className="flex between px-2 normal"
                    >
                      <span className="px-3">{getMsg('addFile')}</span>
                    </Button>
                  </div>
                </div>

                <Table
                  total={totalFound}
                  pageSize={pageSize}
                  page={page}
                  onChangePage={onChangePage}
                  onChangeSize={onChangePageSize}
                  className="media-table"
                >
                  {media_type === 'image'
                    ? renderImageTable()
                    : renderVideoTable()}
                </Table>
              </div>
            </div>

            <div className="col-3 p-3">
              <div className="dnd-container" style={{ overflowY: 'scroll' }}>
                <p className="emphasis py-2">{getMsg('asignedFiles')}</p>

                <DragDropContext onDragEnd={handleOnDragEndAssigedMedia}>
                  <Droppable droppableId="media">
                    {(provided) => (
                      <ol {...provided.droppableProps} ref={provided.innerRef}>
                        {assignedMedia.map((m, index) => (
                          <Draggable
                            key={index}
                            draggableId={`${m.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <div className="assigned-item">
                                  <button
                                    onClick={() => deleteAssignedItem(index)}
                                  >
                                    <SvgIcon
                                      src={DeleteAssinedItemIcon}
                                      color={currentTheme.texts}
                                      width={18}
                                      height={18}
                                    />
                                  </button>
                                  <span>{m.name}</span>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        ))}
                      </ol>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <Button className="normal ml-3 mr-2" onClick={handleAccept}>
              {getMsg('accept')}
            </Button>
            <Button secondary className="normal" onClick={handleAccept}>
              {getMsg('cancel')}
            </Button>
          </div>
        </div>

        <CancelOkModal
          visible={showModal}
          onAccept={toggleModal}
          onCancel={null}
          title={title}
          text={text}
        />

        <CancelOkModal
          visible={deleteModal.showModal}
          onAccept={deleteModal.onAccept}
          onCancel={deleteModal.onCancel}
          title={deleteModal.title}
          text={deleteModal.text}
        />
      </main>
    </Modal>
  );
};

/*
  *




  * */

export default AddMediaModal;
