/**
 * @file Constants needed for the Redux reducers.
 */

 // Reducer names
 export const ACTIVE_ELEMENT_REDUCER = 'activeElementReducer';
 export const CANVAS_REDUCER = 'canvasReducer';
 export const CRAFTML_CODE_REDUCER = 'craftmlCodeReducer';
 export const ELEMENT_REDUCER = 'updateElementReducer';
 export const LOGIN_REDUCER = 'userInfoReducer';

 // Fields in the state tree..
 export const USER_INFO = 'userInfo';
 export const USER_ID = 'userId';
 export const USERNAME = 'name';
 export const USER_PHOTO_URL = 'photo';
 export const USER_EMAIL = 'email';
 export const CANVASES = 'canvases';
 export const ACTIVE_ELEMENT = 'activeElement';
 export const AUTH_STATE = 'authState';
 export const AUTO_GENERATE_CODE = 'autoGenerateCode';
 export const CODE = 'code';
 export const CURRENT_CANVAS = 'currentCanvas';
 export const ELEMENTS = 'elements';

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
  ACTIVE_ELEMENT: null,
  AUTH_STATE: false,
  AUTO_GENERATE_CODE: false,
  CODE: '',
  CURRENT_CANVAS: null,
  ELEMENTS: {},
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

//individual reducer blank states
export const BLANK_STATE_ACTIVE_ELEMENT = {};
BLANK_STATE_ACTIVE_ELEMENT[ACTIVE_ELEMENT] = null;

export const BLANK_STATE_CANVAS = {};
BLANK_STATE_CANVAS[CANVASES] = {};
BLANK_STATE_CANVAS[CURRENT_CANVAS] = null;

export const BLANK_STATE_CRAFTML_CODE = {};
BLANK_STATE_CRAFTML_CODE[CODE] = '';
BLANK_STATE_CRAFTML_CODE[AUTO_GENERATE_CODE] = false;

export const BLANK_STATE_ELEMENTS = {};
BLANK_STATE_ELEMENTS[ELEMENTS] = {};

export const BLANK_STATE_USER_INFO = {};
BLANK_STATE_USER_INFO[AUTH_STATE] = false;
BLANK_STATE_USER_INFO[USER_INFO] = userInfoBranch;
