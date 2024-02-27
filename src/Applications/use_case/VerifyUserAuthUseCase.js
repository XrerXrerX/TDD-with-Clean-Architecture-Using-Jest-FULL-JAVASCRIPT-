class VerifyUserAuthUseCase {
  constructor({
    authenticationTokenManager,
  }) {
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(refreshToken) {

    this._verifyPayload(refreshToken);
    const { username } = await this._authenticationTokenManager.decodePayload(refreshToken);
    return username;
  }

  _verifyPayload(refreshToken) {
    if (!refreshToken || refreshToken === undefined || refreshToken == null || refreshToken == '' || typeof refreshToken !== 'string') {
      throw new Error('REFRESH_VERIFY_OWNER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
  }
}

module.exports = VerifyUserAuthUseCase;
