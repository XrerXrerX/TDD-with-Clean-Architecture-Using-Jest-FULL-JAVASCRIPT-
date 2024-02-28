const { Client } = require('pg');
const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const ClientError = require('../../Commons/exceptions/ClientError');

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  async createRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  async verifyRefreshToken(token) {
    try {

      const artifacts = this._jwt.decode(token);

      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY);

    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    // try {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
    // } catch (error) {
    //   throw new ClientError('Missing authentication');
    // }
  }
}

module.exports = JwtTokenManager;
