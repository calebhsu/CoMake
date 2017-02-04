/* Reducers having to do with the position of elements. */

/* Update the position in firebase.
 * @param {Object} The state of the store.
 * @param {Object} The action to be performed.
 * @return {Object} The new state object.
 */
const updatePosition = (state = { elements: {} }, action) => {
  switch (action.type) {
    case 'initPositions':
      return Object.assign({}, state, {
        elements: action.elements,
      });

    case 'updatePosition':
      if (!action.updatedLocation) {
        return state;
      }
      const elemToUpdate = {};
      elemToUpdate[action.elementId] = {
        position: {
          x: action.updatedLocation.x,
          y: action.updatedLocation.y,
        },
      };

      const updatedElements = Object.assign({}, state.elements, elemToUpdate);
      return Object.assign({}, state, {
        elements: updatedElements,
      });

    default:
      return state
  }
};

export default updatePosition;
