//dan ini untuk mengetest threadrepository domain

class ThreadRepository {
    async addThread(thread, payload) {
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getThread(threadid) {
        throw new Error('GET_THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    // async getThreadsByUserId(userId) {
    //     throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // }

    // async deleteThread(threadId) {
    //     throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    // }
}

module.exports = ThreadRepository;
