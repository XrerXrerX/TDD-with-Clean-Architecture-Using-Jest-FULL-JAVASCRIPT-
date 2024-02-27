// src/Interfaces/http/api/threads/routes.js
const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
  }

]);

module.exports = routes;