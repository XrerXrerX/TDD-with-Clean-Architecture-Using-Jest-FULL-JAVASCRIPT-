//dan ini untuk mengetest threadrepository domain

class CommentThreadRepository {
    async commentThread(thread, auth, params) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async VerifyDeleteComment(commendid) {
        throw new Error('FINDTHREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getComment(threadid) {
        throw new Error('GET_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteComment(params) {
        throw new Error('DELETE_COMMENT_IN_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    async CheckComment(params) {
        throw new Error('DELETE_COMMENT_IN_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = CommentThreadRepository;
