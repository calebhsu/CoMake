import * as firebase from 'firebase';

export const BOARDS_PATH = '/test';

export const setItemLocation = (elemId, newLocation) => {
  firebase.database().ref(`${BOARDS_PATH}/${elemId}/position`).set(newLocation);
};
