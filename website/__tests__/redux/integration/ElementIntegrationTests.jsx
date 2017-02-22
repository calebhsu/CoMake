/**
 * @file Automated tests for the redux positions actions/reducer
 */

import * as firebase from 'firebase';

import { BOARDS_PATH, initFirebase } from '../../../src/firebase-utils'
import storeHelper from '../../../src/redux/storeHelper';
import {
  UPDATE_POSITION
} from '../../../src/redux/actions/ActionConstants';
import {
  initElements, updateElement, updateAndPersist
} from '../../../src/redux/actions/ElementActions';

const maxWaitFirebase = 30000;

describe('ElementIntegrationTests', () => {

  let testStore = null;

  // create a new store before each test
  beforeEach(() => {
    testStore = storeHelper.constructStore();
  });

  // delete the old store after each test
  afterEach(() => {
    testStore = null;
  });

  test('initElements_Dispatch', (done) => {
    const elemList = {
      testingANewItem: {
        position: { x: 1000, y: 33 },
        size: { width: 100, height: 100 },
        rotation: 0,
      },
      testingAnotherNewItem: {
        position: { x: 1, y: 2 },
        size: { width: 50, height: 75 },
        rotation: 45,
      }
    };

    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer)
        .toEqual({
          elements: elemList,
          targeted: null,
        });
      done();
    });

    testStore.dispatch(initElements(elemList));
  });

  test('updatePosition_Dispatch', (done) => {
    const elemList = {
      testingANewItem: {
        position: { x: 1000, y: 33 },
        size: { width: 100, height: 100 },
        rotation: 0,
      },
      testingAnotherNewItem: {
        position: { x: 1, y: 2 },
        size: { width: 50, height: 75 },
        rotation: 45,
      }
    };

    const elemId = 'testingANewItem';

    const updatedLoc = { x: 33, y: 88 };

    const unsubscribe = testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer)
        .toEqual({
          elements: elemList,
          targeted: null,
        });
    });

    testStore.dispatch(initElements(elemList));

    unsubscribe();

    elemList[elemId].position = updatedLoc;

    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer)
        .toEqual({
          elements: elemList,
          targeted: null,
        });
      done();
    });

    testStore.dispatch(updateElement(UPDATE_POSITION, elemId, updatedLoc));
  });

  test('updatePositionAndPersist_Dispatch', (done) => {

    const elemList = {
      testingANewItem: {
        position: { x: 1000, y: 33 },
        size: {width: 100, height: 100 },
        rotation: 0,
      },
      testingAnotherNewItem: {
        position: { x: 1, y: 2 },
        size: { width: 50, height: 75 },
        rotation: 45,
      }
    };

    const elemId = 'testingANewItem';

    const updatedLoc = { x: 33, y: 88 };

    // subscribe and validate the store's state against the current value
    // of elemList. This will get called once for each dispatch and will
    // validate the current elemList value (this value changes between dispatches)
    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer)
        .toEqual({
          elements: elemList,
          targeted: null,
        });
      done();
    });

    // call the initElements dispatch to create an initial state
    testStore.dispatch(initElements(elemList));

    // update the value of elemList to represent the updatedLocation for the
    // item represented by elemId
    elemList[elemId].position = updatedLoc;

    // initialize firebase for this test only
    const firebaseApp = initFirebase();

    // dispatch and persist the changes to firebase
    testStore.dispatch(updateAndPersist(UPDATE_POSITION, elemId, updatedLoc))
        .then(() => {
      /* TODO: Firebase should be mocked! Not a real call to Firebase! */
      const testRef = firebase.database().ref(`${BOARDS_PATH}/${elemId}`);

      // confirm the value in firebase after the dispatch completes
      return testRef.once('value').then((testPositionSnap) => {
        expect(testPositionSnap.child('position').val()).toEqual(updatedLoc);
        // remove the testRef value from the database
        testRef.remove().then(() => {
          // after all firebase checks are done, shutdown firebase
          firebaseApp.delete();
        });
      });
    });
  });
});
