/**
 * @file Constants needed for the Redux reducers.
 */

 // Fields in the state tree..
 export const USER_INFO = 'userInfo';
 export const USERNAME = 'name';
 export const USER_PHOTO_URL = 'photo';
 export const USER_EMAIL = 'email';
 export const CANVASES = 'canvases';
 export const CURRENT_CANVAS = 'currentCanvas';
 export const ELEMENTS = 'elements';
 export const ACTIVE_ELEMENT = 'activeElement';

// The blank state tree for redux.
/* Looks like...
{
  USER_INFO: {
    USERNAME: null,
    USER_PHOTO_URL: null,
    USER_EMAIL: null,
  },
  CANVASES: {},
  CURRENT_CANVAS: null,
  ELEMENTS: {},
  ACTIVE_ELEMENT: null,
}
*/
const userInfoBranch = {};
userInfoBranch[USERNAME] = null;
userInfoBranch[USER_PHOTO_URL] = null;
userInfoBranch[USER_EMAIL] = null;
const BLANK_STATE = {};
BLANK_STATE[USER_INFO] = userInfoBranch;
BLANK_STATE[CANVASES] = {};
BLANK_STATE[CURRENT_CANVAS] = null;
BLANK_STATE[ELEMENTS] = {};
BLANK_STATE[ACTIVE_ELEMENT] = null;
export { BLANK_STATE };

// Fields for elements.
export const ELEMENT_POSITION = 'position';
export const ELEMENT_SIZE = 'size';
export const ELEMENT_ROTATION = 'rotation';
export const ELEMENT_MODULE = 'module';
export const ELEMENT_ATTRS = [ELEMENT_POSITION, ELEMENT_SIZE, ELEMENT_ROTATION,
  ELEMENT_MODULE]

// Fields for canvas.
export const CANVAS_NAME = 'name';
export const CANVAS_OWNER = 'owner';
export const CANVAS_USERS = 'users';
