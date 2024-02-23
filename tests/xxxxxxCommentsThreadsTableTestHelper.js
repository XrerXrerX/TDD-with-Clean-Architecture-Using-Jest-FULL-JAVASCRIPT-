/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsThreadsTableTestHelper = {
    async commentThread({
        id = 'comment-123', threadId = 'thread-123', content = 'Sample content', owner = 'user-456',
    }) {
        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4)',
            values: [id, threadId, content, owner],
        };

        await pool.query(query);
    },

    async findComment(threadId = 'thread-123') {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [threadId],
        };

        await pool.query(query);
    },
    // async findThread(threadId = 'Threadid') {
    //     const query = {
    //         text: 'SELECT * FROM comments WHERE id = $1',
    //         values: [threadId],
    //     };

    //     await pool.query(query);
    // },


    async cleanTable() {
        await pool.query('DELETE FROM comments WHERE 1=1');
    },
};

module.exports = CommentsThreadsTableTestHelper;
