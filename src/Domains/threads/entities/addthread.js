//ini untuk menguhi addThead.js
class AddThread {
    constructor(payload) {
        this._verifyPayload(payload);
        const { title, body, owner } = payload;
        this.title = title;
        this.owner = owner;
        this.body = body;
    }

    _verifyPayload({ title, body, owner }) {
        if (!title || !body || title === undefined || body === undefined) {
            throw new Error('THREAD.NO_HAVE_GOOD_PAYLOAD');
        }

        if (typeof body !== 'string' || typeof title !== 'string') {
            throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!owner || typeof owner !== 'string' || owner === undefined) {
            throw new Error('THREAD.NO_HAVE_OWNER_FOR_AUTHENTICATION_IN_ADDTHREAD');
        }
    }
}

module.exports = AddThread;
