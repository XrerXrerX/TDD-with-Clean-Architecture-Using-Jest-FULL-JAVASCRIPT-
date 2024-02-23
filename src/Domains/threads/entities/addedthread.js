class AddedThread {
    constructor({ id, title, owner }) {
        this._verifyPayload({ id, title, owner });
        this.id = id;
        this.title = title;
        this.owner = owner;
    }

    _verifyPayload({ id, title, owner }) {
        if (!id) {
            throw new Error('ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_ID_ADDEDTHREAD');
        }
        if (!title) {
            throw new Error('ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_TITLE_ADDEDTHREAD');
        }
        if (!owner) {
            throw new Error('ADDEDTHREAD.NOT_HAVE_NEEDED_AUTHNENTICATION_OWNER');
        }
    }
}

module.exports = AddedThread;
