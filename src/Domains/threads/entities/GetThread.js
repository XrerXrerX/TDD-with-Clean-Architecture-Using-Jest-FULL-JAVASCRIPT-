class GetThread {
    constructor(payload) {
        this._verifyPayload(payload);
        const { id, title, body, owner, created_at } = payload;
        this.id = id;
        this.title = title;
        this.body = body;
        this.owner = owner;
        this.created_at = created_at;
    }
    _verifyPayload({ id, title, body, owner, created_at }) {
        if (!id || !title || !body || !owner || !created_at) {
            throw new Error('GET_DATA_THREAD.NO_HAVE_DATA_TO_SERVE');
        }
    }
}
module.exports = GetThread;