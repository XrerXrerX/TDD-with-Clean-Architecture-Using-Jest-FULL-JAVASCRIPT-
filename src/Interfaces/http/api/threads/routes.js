// src/Interfaces/http/api/threads/routes.js
const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
  },
  {
    method: 'POST',
    path: '/threads/{threadid}/comments',
    handler: handler.postCommentThreadHandler,
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getThreadCommentHandler,
  },

  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
  },

]);

module.exports = routes;