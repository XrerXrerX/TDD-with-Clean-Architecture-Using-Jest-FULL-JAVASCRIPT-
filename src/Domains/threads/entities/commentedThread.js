class CommentedThread {
    constructor(payload) {
        this._verifyPayload(payload);
        const { id, content, owner } = payload;
        this.id = id;
        this.content = content;
        this.owner = owner;
    }
    _verifyPayload({ id, content, owner }) {
        if (!id) {
            throw new Error('COMENTEDTHREAD.NOT_HAVE_ID_FOR_FIND_THREAD');
        }

        if (!owner) {
            throw new Error('COMENTEDTHREAD.NOT_HAVE_OWNER_FOR_AUTHENTICATION');

        }
        if (!content) {
            throw new Error('COMENTEDTHREAD.NOT_HAVE_CONTENT_FOR_FIND_THREAD');

        }

        if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
            throw new Error('COMENTEDTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }


    }
}
module.exports = CommentedThread;
