/**
 * @file Constants needed for the Redux reducers.
 */

 // Fields in the state tree..
 export const USER_INFO = 'userInfo';
 export const USER_ID = 'userId';
 export const USERNAME = 'name';
 export const USER_PHOTO_URL = 'photo';
 export const USER_EMAIL = 'email';
 export const CANVASES = 'canvases';
 export const CURRENT_CANVAS = 'currentCanvas';
 export const ELEMENTS = 'elements';
 export const ACTIVE_ELEMENT = 'activeElement';
 export const CODE = 'code';
 export const AUTO_GENERATE_CODE = 'autoGenerateCode';

// The blank state tree for redux.
/* Looks like...
{
  USER_INFO: {
    USER_ID: null,
    USERNAME: null,
    USER_PHOTO_URL: null,
    USER_EMAIL: null,
  },
  CANVASES: {
    <canvasID>: {
      CANVAS_NAME: null,
      CANVAS_ORIENTATION: null,
      CANVAS_OWNER: null,
      CANVAS_USERS: null,
    }
  },
  CURRENT_CANVAS: null,
  ELEMENTS: {},
  CODE: '',
  AUTO_GENERATE_CODE: false,
  ACTIVE_ELEMENT: null,
}
*/
const userInfoBranch = {};
userInfoBranch[USER_ID] = null;
userInfoBranch[USERNAME] = null;
userInfoBranch[USER_PHOTO_URL] = null;
userInfoBranch[USER_EMAIL] = null;
const BLANK_STATE = {};
BLANK_STATE[USER_INFO] = userInfoBranch;
BLANK_STATE[CANVASES] = {};
BLANK_STATE[CURRENT_CANVAS] = null;
BLANK_STATE[ELEMENTS] = {};
BLANK_STATE[ACTIVE_ELEMENT] = null;
BLANK_STATE[CODE] = '';
BLANK_STATE[AUTO_GENERATE_CODE] = false;
export { BLANK_STATE };

// Fields for elements.
export const ELEMENT_POSITION = 'position';
export const ELEMENT_SIZE = 'size';
export const ELEMENT_ROTATION = 'rotation';
export const ELEMENT_MODULE = 'module';
export const ELEMENT_IMAGE = 'image';
export const ELEMENT_ATTRS = [ELEMENT_POSITION, ELEMENT_SIZE, ELEMENT_ROTATION,
  ELEMENT_MODULE, ELEMENT_IMAGE];

// Fields for canvas.
export const CANVAS_NAME = 'name';
export const CANVAS_ORIENTATION = 'orientation';
export const CANVAS_OWNER = 'owner'
export const CANVAS_USERS = 'users';
