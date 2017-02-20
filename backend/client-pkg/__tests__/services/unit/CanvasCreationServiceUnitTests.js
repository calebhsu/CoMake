/**
 * @file Integration tests for the CanvasCreationService client package
 */
const CanvasCreationService = require('../../../services/CanvasCreationService');

describe('CanvasCreationServiceUnitTests', () => {
  test('formRequest_success', () => {
    const name = 'canvas-name';
    const creatingUser = 'creating-user';
    const teacher = 'canvas-teacher';
    const userList = ['testing', 'testing2']

    const expectedRequest = {
       name,
       creatingUser,
       teacher,
       userList,
    }

    const actualRequest = CanvasCreationService.formRequestBody(name, creatingUser, teacher, userList);

    expect(actualRequest).toEqual(expectedRequest);
  });

  test('formRequest_nameInvalid_exception', () => {
    const name = 1;
    const creatingUser = 'creating-user';
    const teacher = 'canvas-teacher';
    const userList = ['testing', 'testing2']

    const expectedRequest = {
       name,
       creatingUser,
       teacher,
       userList,
    }

    try {
      CanvasCreationService.formRequestBody(name, creatingUser, teacher, userList);
    } catch(err) {
      expect(err).toEqual('CanvasCreationService.formRequestBody - invalid name param, must be a String');
    }
  });

  test('formRequest_creatingUserInvalid_exception', () => {
    const name = 'canvas-name';
    const creatingUser = true;
    const teacher = 'canvas-teacher';
    const userList = ['testing', 'testing2']

    const expectedRequest = {
       name,
       creatingUser,
       teacher,
       userList,
    }

    try {
      CanvasCreationService.formRequestBody(name, creatingUser, teacher, userList);
    } catch(err) {
      expect(err).toEqual('CanvasCreationService.formRequestBody - invalid creatingUser param, must be a String');
    }
  });

  test('formRequest_teacherinvalid_exception', () => {
    const name = 'canvas-name';
    const creatingUser = 'creating-user';
    const teacher = 1;
    const userList = ['testing', 'testing2']

    const expectedRequest = {
       name,
       creatingUser,
       teacher,
       userList,
    }

    try {
      CanvasCreationService.formRequestBody(name, creatingUser, teacher, userList);
    } catch(err) {
      expect(err).toEqual('CanvasCreationService.formRequestBody - invalid teacher param, must be null or a String');
    }
  });

  test('formRequest_userListInvalid_exception', () => {
    const name = 'canvas-name';
    const creatingUser = 'creating-user';
    const teacher = 'canvas-teacher';
    const userList = 'Im a user'

    try {
      CanvasCreationService.formRequestBody(name, creatingUser, teacher, userList);
    } catch(err) {
      expect(err).toEqual('CanvasCreationService.formRequestBody - invalid userList param, must be an Array');
    }
  });
});