import { setItemLocation } from '../../firebase-utils';

export const initPositions = elemList => ({
  type: 'initPositions',
  elements: elemList,
});

export const updatePosition = (elemId, updatedLoc) => ({
  type: 'updatePosition',
  elementId: elemId,
  updatedLocation: updatedLoc,
});

export const updatePositionAndPersist = (elemId, updatedLoc) => (
  (dispatch) => {
    dispatch(updatePosition(elemId, updatedLoc));

    return setItemLocation(elemId, updatedLoc);
  }
);
