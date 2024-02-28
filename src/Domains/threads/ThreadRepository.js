//dan ini untuk mengetest threadrepository domain

class ThreadRepository {
    async addThread(thread, payload) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getThread(threadid) {
        throw new Error('GET_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }


    async verifyThreadAvailability(threadid) {
        throw new Error('FINDTHREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async CheckThread(threadid) {
        throw new Error('FINDTHREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    // async deleteThread(threadId) {
    //     throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // }
}

module.exports = ThreadRepository;
