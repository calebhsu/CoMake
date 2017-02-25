/**
 * @file Constants needed for the Redux reducers.
 */

 // Fields in the state tree..
 export const USER_INFO = 'userInfo';
 export const USERNAME = 'username';
 export const USER_PHOTO_URL = 'photoURL';
 export const USER_EMAIL = 'email';
 export const CANVASES = 'canvases';
 export const CURRENT_CANVAS = 'currentCanvas';
 export const CANVAS_NAME = 'canvasName';
 export const CANVAS_ADMIN = 'admin';
 export const CANVAS_COLLABORATORS = 'collaborators';
 export const CANVAS_ELEMENTS = 'elements';
 export const CANVAS_ACTIVE_ELEMENT = 'activeElement';

// The blank state tree for redux.
/* Looks like...
{
  USER_INFO: {
    USERNAME: null,
    USER_PHOTO_URL: null,
    USER_EMAIL: null,
  },
  CANVASES: {},
  CURRENT_CANVAS: {
    CANVAS_NAME: null,
    CANVAS_ADMIN: null,
    CANVAS_COLLABORATORS: [],
    CANVAS_ELEMENTS: {},
    CANVAS_ACTIVE_ELEMENT: null,
  }
}
*/
const userInfoBranch = {};
userInfoBranch[USERNAME] = null;
userInfoBranch[USER_PHOTO_URL] = null;
userInfoBranch[USER_EMAIL] = null;
const currCanvas = {};
currCanvas[CANVAS_NAME] = null;
currCanvas[CANVAS_ADMIN] = null;
currCanvas[CANVAS_COLLABORATORS] = [];
currCanvas[CANVAS_ELEMENTS] = {};
currCanvas[CANVAS_ACTIVE_ELEMENT] = null;
const BLANK_STATE = {};
BLANK_STATE[USER_INFO] = userInfoBranch;
BLANK_STATE[CANVASES] = {};
BLANK_STATE[CURRENT_CANVAS] = currCanvas;
export { BLANK_STATE };

// Fields for elements.
export const ELEMENT_POSITION = 'position';
export const ELEMENT_SIZE = 'size';
export const ELEMENT_ROTATION = 'rotation';
export const ELEMENT_MODULE = 'module';
export const ELEMENT_ATTRS = [ELEMENT_POSITION, ELEMENT_SIZE, ELEMENT_ROTATION,
  ELEMENT_MODULE]
