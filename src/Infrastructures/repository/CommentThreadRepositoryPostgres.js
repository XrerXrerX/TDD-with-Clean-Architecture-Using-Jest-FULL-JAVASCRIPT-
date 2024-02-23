// /**UJI SEMUA TESTING
//  * ********************************
//  * require semua kebutuhan dan addedthread wajib untuk validasi dan juga threadreposotory domain wajib
//  * setelah addthread lanjut ke error translator > daftar ke createserver > buat handler dll
//  *
//  */

const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');
const CommentedThread = require("../../Domains/threads/entities/commentedThread");
const ComentThreadRepository = require('../../Domains/threads/CommentThreadRepository');

// // const generateThreadId = require('../../Applications/utils/idGenerator');

// /** di container sudah require semua threadrepository domain dan juga depencenciesnya di dalam container
//  * ****************************************************************
//  * pastikan sudah require di repository dan jua usecase wajib
//  * sesuaikan depencensi di constructor apa saja yang akan di pakai
// */

class CommentThreadRepositoryPostgres extends ComentThreadRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }
    async commentThread(commentThread) {
        const { threadid, content, owner } = commentThread;
        //dari container dan dependecies

        const id = `comment-${this._idGenerator()}`;
        const created_at = new Date().toISOString();

        //transslate domclgain error jadikan error 
        if (!owner || owner == undefined || owner == null || owner == '') {
            throw new AuthenticationError('ADDEDTHREAD.NOT_HAVE_NEEDED_AUTHNENTICATION_OWNER');
        }

        const query = {
            text: 'INSERT INTO comments (id, threadid, content, owner , created_at) VALUES($1, $2, $3 , $4,$5) RETURNING id, threadid, content , owner',
            values: [id, threadid, content, owner, created_at],
        };


        const result = await this._pool.query(query);
        return new CommentedThread({
            ...result.rows[0]
        });
    }

    async findThread(threadId) {
        const query = {
            text: 'SELECT id FROM threads WHERE id = $1',
            values: [threadId],
        };
        const result = await this._pool.query(query);
        if (result.rowCount == 0) {
            throw new NotFoundError('thread not found');
        }
        return result.rows[0];
    }

    async getComment(threadId) {
        const commentquery = {
            text: 'SELECT * FROM comments WHERE threadid = $1',
            values: [threadId],
        };
        const commentdata = await this._pool.query(commentquery);

        return commentdata.rows;
    }

    async deleteComment(params, reqowner) {
        const { threadId, commentId } = params;

        const data_dihapus = '**komentar telah dihapus**';
        const deletequery = {
            text: 'UPDATE comments SET is_delete = true ,  content = $3 WHERE threadid = $1 AND id = $2 RETURNING *',
            values: [threadId, commentId, data_dihapus],
        };
        const comment = await this._pool.query(deletequery);
        if (comment.rowCount == 0) {
            throw new NotFoundError('Comment Not Founnd');
        }

        if (comment.rows[0].owner != reqowner.username) {
            throw new AuthorizationError('Delete Comment not Allowed');

        }

        return comment.rows[0].is_delete;
    };
}
module.exports = CommentThreadRepositoryPostgres;
