/**
 * @file Automated tests for the redux positions actions/reducer
 */

import * as firebase from 'firebase';

import { BOARDS_PATH, initFirebase } from '../../../src/firebase-utils'
import storeHelper from '../../../src/redux/storeHelper';
import { initPositions, updatePosition, updatePositionAndPersist } from '../../../src/redux/actions/positionsActions';

const maxWaitFirebase = 30000;

describe('PositionsIntegrationTests.', () => {

  let testStore = null;

  // create a new store before each test
  beforeEach(() => {
    testStore = storeHelper.constructStore();
  });

  // delete the old store after each test
  afterEach(() => {
    testStore = null;
  });

  test('initPositions_Dispatch', () => {
    const elemList = {
      testingANewItem: {
        position: { x: 1000, y: 33 }
      },
      testingAnotherNewItem: {
        position: { x: 1, y: 2 }
      }
    };

    testStore.subscribe(() => {
      expect(testStore.getState())
        .toEqual({
          positions: {
            elements: elemList
          }
        });
    });

    testStore.dispatch(initPositions(elemList));
  });

  test('updatePosition_Dispatch', () => {
    const elemList = {
      testingANewItem: {
        position: { x: 1000, y: 33 }
      },
      testingAnotherNewItem: {
        position: { x: 1, y: 2 }
      }
    };

    const elemId = 'testingANewItem';

    const updatedLoc = { x: 33, y: 88 };

    const unsubscribe = testStore.subscribe(() => {
      expect(testStore.getState())
        .toEqual({
          positions: {
            elements: elemList
          }
        });
    });

    testStore.dispatch(initPositions(elemList));

    unsubscribe();

    elemList[elemId].position = updatedLoc;

    testStore.subscribe(() => {
      expect(testStore.getState())
        .toEqual({
          positions: {
            elements: elemList
          }
        });
    });

    testStore.dispatch(updatePosition(elemId, updatedLoc));
  });

  test('updatePositionAndPersist_Dispatch', () => {

    const elemList = {
      testingANewItem: {
        position: { x: 1000, y: 33 }
      },
      testingAnotherNewItem: {
        position: { x: 1, y: 2 }
      }
    };

    const elemId = 'testingANewItem';

    const updatedLoc = { x: 33, y: 88 };

    // subscribe and validate the store's state against the current value
    // of elemList. This will get called once for each dispatch and will
    // validate the current elemList value (this value changes between dispatches)
    testStore.subscribe(() => {
      expect(testStore.getState())
        .toEqual({
          positions: {
            elements: elemList
          }
        });
    });

    // call the initPositions dispatch to create an initial state
    testStore.dispatch(initPositions(elemList));

    // update the value of elemList to represent the updatedLocation for the
    // item represented by elemId
    elemList[elemId].position = updatedLoc;

    // initialize firebase for this test only
    const firebaseApp = initFirebase();

    // dispatch and persist the changes to firebase
    testStore.dispatch(updatePositionAndPersist(elemId, updatedLoc)).then(() => {
      const testRef = firebase.database().ref(`${BOARDS_PATH}/${elemId}`);

      // confirm the value in firebase after the dispatch completes
      testRef.once('value').then((testPositionSnap) => {
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
