/**MELANJUTKAN SETELAH THREADREPOSITORYPOSTGRES
 * ********************************
 * require sesuai kebutuhan yang ada kalau bisa tanpa ada send error 
 * semau error ditanganin error translation 
 * setelah ini lanjutkan ke test handler di createserver harus dibuat juga testingnya 
 */

// src/Interfaces/http/api/threads/handler.js
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
// const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');
const VerifyUserAuthUseCase = require('../../../../Applications/use_case/VerifyUserAuthUseCase');

const AuthenticationTokenManager = require('../../../../Infrastructures/security/JwtTokenManager');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {

    const { id: owneruser } = request.auth.credentials;


    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload, owneruser);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }
}
module.exports = ThreadsHandler;
