// src/Interfaces/http/api/threads/routes.js
const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadid}/comments',
    handler: handler.postCommentThreadHandler,
    options: {
      auth: 'jwtowner',
    },
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
    options: {
      auth: 'jwtowner',
    },
  },

]);

module.exports = routes;