//seterlah payload yang ditest dan atributnya lanjut ke function repository untuk melanjutkan proses hanya sebatas function
//disini menejelaskan ada function apa saja 

// tests/Domains/threads/ThreadRepository.test.js
const CommentThreadRepository = require('../CommentThreadRepository');

describe('ComentThreadRepository', () => {
    const commentThreadRepository = new CommentThreadRepository();


    it('should throw "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for commentedThread', async () => {
        await expect(commentThreadRepository.commentThread()).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw "FIND_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for commentedThread', async () => {
        await expect(commentThreadRepository.verifyThreadAvailability()).rejects.toThrow('FINDTHREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw "GET_COMMENT_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for getThreadsByUserId', async () => {
        await expect(commentThreadRepository.getComment()).rejects.toThrow('GET_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for deleteThread', async () => {
        await expect(commentThreadRepository.deleteComment()).rejects.toThrow('DELETE_COMMENT_IN_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});
