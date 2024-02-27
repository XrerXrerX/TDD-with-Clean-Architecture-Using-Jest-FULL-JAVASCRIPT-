// src/Interfaces/http/api/threads/index.js
const CommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'comments',
  register: async (server, { container }) => {
    const commentHandler = new CommentsHandler(container);
    server.route(routes(commentHandler));
  },
};
