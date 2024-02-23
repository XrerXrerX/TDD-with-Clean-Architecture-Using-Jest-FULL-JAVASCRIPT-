/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentThreadsTableTestHelper = {
    async commentThread({
        id = 'comment-123', threadid = 'thread-123', content = 'content comment thread', owner = 'dicoding', created_at = new Date().toISOString()
    }) {
        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4 ,$5)',
            values: [id, threadid, content, owner, created_at],
        };

        await pool.query(query);
    },

    // async findThread(id) {
    //     const query = {
    //         text: 'SELECT * FROM comments WHERE id = $1',
    //         values: [id],
    //     };

    //     const result = await pool.query(query);
    //     return result.rows;
    // },
    async findComment(threadId) {
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [threadId],
        };

        const result = await pool.query(query);
        return result.rows;

    },

    async cleanTable() {
        await pool.query('DELETE FROM comments WHERE 1=1');
    },
};

module.exports = CommentThreadsTableTestHelper;
