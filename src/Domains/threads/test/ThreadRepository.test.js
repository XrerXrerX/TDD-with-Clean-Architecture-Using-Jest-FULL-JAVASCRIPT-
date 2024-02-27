//seterlah payload yang ditest dan atributnya lanjut ke function repository untuk melanjutkan proses hanya sebatas function
//disini menejelaskan ada function apa saja 

// tests/Domains/threads/ThreadRepository.test.js
const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository', () => {
    const threadRepository = new ThreadRepository();


    it('should throw "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for addThread', async () => {
        await expect(threadRepository.addThread()).rejects.toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for commentedThread', async () => {
        await expect(threadRepository.getThread()).rejects.toThrow('GET_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw "FIND_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for commentedThread', async () => {
        await expect(threadRepository.verifyThreadAvailability()).rejects.toThrow('FINDTHREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    // it('should throw "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for getThreadsByUserId', async () => {
    //     await expect(threadRepository.getThreadsByUserId()).rejects.toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // });

    // it('should throw "THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED" for deleteThread', async () => {
    //     await expect(threadRepository.deleteThread()).rejects.toThrow('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // });
});
