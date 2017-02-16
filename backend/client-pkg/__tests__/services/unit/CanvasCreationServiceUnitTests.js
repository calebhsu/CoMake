/**
 * @file Integration tests for the CanvasCreationService client package
 */
const CanvasCreationService = require('../../../services/CanvasCreationService');

describe('CanvasCreationServiceUnitTests.', () => {
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
});