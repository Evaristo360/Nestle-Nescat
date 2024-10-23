export const actions = {
  setState: 'setState',
  toggleMuteVideo: 'toggleMuteVideo',
  addToTimeline: 'addToTimeline',
  deleteFromTimeline: 'deleteFromTimeline',
  concatToTimeline: 'concatToTimeline',
  updateTimelineItem: 'updateTimelineItem',
  updateSceneDuration: 'updateSceneDuration',
  updateSceneSelect: 'updateSceneSelect',
  updateScene: 'updateScene',
  updateSceneById: 'updateSceneById',
  moveElementInTimeline: 'moveElementInTimeline',
  deleteFromTimelineById: 'deleteFromTimelineById',
  updateResolution: 'updateResolution',
  updateSceneBackground: 'updateSceneBackground',
  deleteTimelineItemsByAdvertisementIds: 'deleteTimelineItemsByAdvertisementIds'
};

export const setState = (state) => ({ type: actions.setState, state });
export const toggleMuteVideo = (index) => ({
  type: actions.toggleMuteVideo,
  index
});
export const addToTimeline = (item) => ({ type: actions.addToTimeline, item });
export const deleteFromTimeline = (index) => ({
  type: actions.deleteFromTimeline,
  index
});
export const deleteFromTimelineById = (id) => ({
  type: actions.deleteFromTimelineById,
  id
});
export const concatToTimeline = (items) => ({
  type: actions.concatToTimeline,
  items
});
export const updateTimelineItem = (item) => ({
  type: actions.updateTimelineItem,
  item
});
export const updateSceneDuration = () => ({
  type: actions.updateSceneDuration
});
export const updateSceneSelect = () => ({ type: actions.updateSceneSelect });
export const updateScene = ({ timeline }) => ({
  type: actions.updateScene,
  timeline
});
export const updateSceneById = (id, data) => ({
  type: actions.updateSceneById,
  id,
  data
});
export const updateResolution = () => ({ type: actions.updateResolution });
export const updateSceneBackground = () => ({
  type: actions.updateSceneBackground
});
export const moveElementInTimeline = (sourceIndex, destIndex) => ({
  type: actions.moveElementInTimeline,
  sourceIndex,
  destIndex
});
export const deleteTimelineItemsByAdvertisementIds = (ids) => ({
  type: actions.deleteTimelineItemsByAdvertisementIds,
  ids
});
