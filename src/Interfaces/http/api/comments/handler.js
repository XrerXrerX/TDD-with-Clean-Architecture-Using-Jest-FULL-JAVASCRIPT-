/**MELANJUTKAN SETELAH THREADREPOSITORYPOSTGRES
 * ********************************
 * require sesuai kebutuhan yang ada kalau bisa tanpa ada send error 
 * semau error ditanganin error translation 
 * setelah ini lanjutkan ke test handler di createserver harus dibuat juga testingnya 
 */

// src/Interfaces/http/api/threads/handler.js
const CommentThreadUseCase = require('../../../../Applications/use_case/CommentThreadUseCase');
const GetThreadCommentUseCase = require('../../../../Applications/use_case/GetThreadCommentUseCase');
const DeleteCommentInThreadUseCase = require('../../../../Applications/use_case/DeleteCommentInThreadUseCase');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');


class commentHandler {
  constructor(container) {
    this._container = container;
    this.postCommentThreadHandler = this.postCommentThreadHandler.bind(this);
    this.getThreadCommentHandler = this.getThreadCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }


  async postCommentThreadHandler(request, h) {
    const { id: owneruser } = request.auth.credentials;
    const commentThreadUseCase = this._container.getInstance(CommentThreadUseCase.name);
    const addedComment = await commentThreadUseCase.execute(request.payload, owneruser, request.params);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadCommentHandler(request, h) {
    const getThreadCommentUseCase = this._container.getInstance(GetThreadCommentUseCase.name);
    const thread = await getThreadCommentUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        thread// Mengubah objek thread menjadi array dengan satu elemen
      },
    });
    response.code(200);
    return response;
  }

  async deleteCommentHandler(request, h) {
    const { headers } = request;
    const deleteCommentInThreadUseCase = this._container.getInstance(DeleteCommentInThreadUseCase.name);
    await deleteCommentInThreadUseCase.execute(request.params, headers);
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}
module.exports = commentHandler;
