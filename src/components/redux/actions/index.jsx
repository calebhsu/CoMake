import * as firebase from 'firebase';

export const initPositions = elemList => ({
  type: 'initPositions',
  elements: elemList,
});

export const updatePosition = (elemId, updatedLoc, saveToFirebase) => ({
  type: 'updatePosition',
  elementId: elemId,
  updatedLocation: updatedLoc,
  persist: saveToFirebase,
});
