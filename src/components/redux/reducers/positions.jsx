const updatePosition = (state = { elements: {} }, action) => {
  switch (action.type) {
    case 'initPositions':
      return Object.assign({}, state, {
        elements: action.elements,
      });

    case 'updatePosition':
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

    case 'firebaseUpdate':
      // TODO: this part

    default:
      return state
  }
};

export default updatePosition;
