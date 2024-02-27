const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const VerifyUserAuthUseCase = require('../VerifyUserAuthUseCase');

describe('RefreshAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = '';
    const refreshAuthenticationUseCase = new VerifyUserAuthUseCase({});

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_VERIFY_OWNER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });


  it('should orchestrating the refresh authentication action correctly', async () => {
    // Arrange
    const useCasePayload = 'some_refresh_token';

    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    // Mocking

    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123' }));

    // Create the use case instace
    const refreshAuthenticationUseCase = new VerifyUserAuthUseCase({
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const payload = await refreshAuthenticationUseCase.execute(useCasePayload);

    // Assert

    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload);

    expect(payload).toEqual('dicoding');
  });
});
