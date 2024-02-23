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
        if (!title) {
            throw new Error('THREAD.NO_HAVE_TITLE_IN_ADDTHREAD');
        }
        if (!body) {
            throw new Error('THREAD.NO_HAVE_BODY_IN_ADDTHREAD');
        }

        if (!owner) {
            throw new Error('THREAD.NO_HAVE_OWNER_FOR_AUTHENTICATION_IN_ADDTHREAD');
        }
    }
}

module.exports = AddThread;
