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


class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {


    if (!request.headers.authorization || request.headers.authorization == '') {
      throw new AuthenticationError('Missing authentication');
    }
    const { headers } = request;
    const headersmock = headers.authorization.split(' ')[1];
    headers.authorization = headersmock
    const { authorization: owneruser } = headers;
    const verifyowner = this._container.getInstance(VerifyUserAuthUseCase.name);
    const owner = await verifyowner.execute(owneruser);
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload, owner);

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
