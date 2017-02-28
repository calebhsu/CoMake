/**
 * @file Integration test for Redux store for elements.
 */

import storeHelper from '../../../src/redux/storeHelper';
import * as AC from '../../../src/redux/actions/ActionConstants';
import * as ElementActions from '../../../src/redux/actions/ElementActions';
import * as RC from '../../../src/redux/reducers/ReducerConstants';

describe('ElementIntegrationTests', () => {

  let testStore = null;
  const elemList = {
    testingANewItem: {
      position: { x: 1000, y: 33 },
      size: { width: 100, height: 100 },
      rotation: 0,
      module: 'abcd',
    },
    testingAnotherNewItem: {
      position: { x: 1, y: 2 },
      size: { width: 50, height: 75 },
      rotation: 45,
      module: 'wxyz',
    }
  };
  const filledState = Object.assign({}, RC.BLANK_STATE);
  filledState[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS] = elemList;

  // create a new store before each test
  beforeEach(() => {
    testStore = storeHelper.constructStore();
  });

  // delete the old store after each test
  afterEach(() => {
    testStore = null;
  });

  test('initElements_Dispatch', (done) => {
    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer).toEqual(filledState);
      done();
    });

    testStore.dispatch(ElementActions.initElements(elemList));
  });

  test('updatePosition_Dispatch', (done) => {
    // Fill in the store so we have something to test.
    testStore.dispatch(ElementActions.initElements(elemList));
    // Assemble what is expected.
    const elemId = 'testingANewItem';
    const updatedLoc = { x: 33, y: 88 };
    const expected = Object.assign({}, filledState);
    expected[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS][elemId][RC.ELEMENT_POSITION]
      = updatedLoc;

    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer).toEqual(expected);
      done();
    });

    // Update the state again.
    testStore.dispatch(ElementActions.updateElement(AC.UPDATE_POSITION, elemId,
      updatedLoc));
  });

  test('updateSize_Dispatch', (done) => {
    // Fill in the store so we have something to test.
    testStore.dispatch(ElementActions.initElements(elemList));
    // Assemble what is expected.
    const elemId = 'testingANewItem';
    const updatedSize = { 'width': 25, 'height': 60 };
    const expected = Object.assign({}, filledState);
    expected[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS][elemId][RC.ELEMENT_SIZE]
      = updatedSize;

    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer).toEqual(expected);
      done();
    });

    // Update the state again.
    testStore.dispatch(ElementActions.updateElement(AC.UPDATE_SIZE, elemId,
      updatedSize));
  });

  test('updateRotation_Dispatch', (done) => {
    // Fill in the store so we have something to test.
    testStore.dispatch(ElementActions.initElements(elemList));
    // Assemble what is expected.
    const elemId = 'testingANewItem';
    const updatedRotation = -26;
    const expected = Object.assign({}, filledState);
    expected[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS][elemId][RC.ELEMENT_ROTATION]
      = updatedRotation;

    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer).toEqual(expected);
      done();
    });

    // Update the state again.
    testStore.dispatch(ElementActions.updateElement(AC.UPDATE_ROTATION, elemId,
      updatedRotation));
  });

  test('addElement_Dispatch', (done) => {
    testStore.dispatch(ElementActions.initElements(elemList));
    // Assemble what is to be expected.
    const newElement = {
      'position': {
        'x': 100,
        'y': 50,
      },
      'size': {
        'width': 100,
        'height': 20,
      },
      'rotation': 30,
      'module': 'testModule',
    };
    const elemId = 'newElement';
    const expected = Object.assign({}, filledState);
    expected[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS][elemId] = newElement;

    testStore.subscribe(() => {
      expect(testStore.getState().updateElementReducer).toEqual(expected);
      done();
    });

    //Update the state again.
    testStore.dispatch(ElementActions.addElement(elemId, newElement));
  });

  /* TODO: Find out how to do updateAndPersist once firebase is mocked. */
});
