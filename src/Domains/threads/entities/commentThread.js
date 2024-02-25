class CommentThread {
    constructor(payload) {
        this._verifyPayload(payload);
        const { threadid, content, owner } = payload;
        this.threadid = threadid;
        this.content = content;
        this.owner = owner;
    }
    _verifyPayload({ threadid, content, owner }) {
        if (!threadid) {
            throw new Error('COMMMENTTHREAD.NOT_CONTAIN_THREADID_PROPERTY');
        }
        if (!content) {
            throw new Error('COMMMENTTHREAD.NOT_CONTAIN_CONTENT_PROPERTY');
        }
        if (!owner || typeof owner !== 'string') {
            throw new Error('COMMMENTTHREAD.NOT_CONTAIN_NEEDED_AUTHENTICATION');
        }



        if (typeof content !== 'string') {
            throw new Error('COMMENTTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (content.length > 50) {
            throw new Error('COMMENTTHREAD.CONTENT_LIMIT_CHAR');
        }
    }
}
module.exports = CommentThread;