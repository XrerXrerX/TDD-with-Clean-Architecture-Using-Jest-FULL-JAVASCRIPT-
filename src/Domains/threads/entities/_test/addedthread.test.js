const AddedThread = require('../addedthread');

describe('Thread Entity', () => {

    it('should throw error when payload dont have needed property', () => {
        expect(() => new AddedThread({
            owner: 'dicoding',
        })).toThrowError('ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_ID_ADDEDTHREAD');
    });

    it('should throw error when payload dont have needed property', () => {
        expect(() => new AddedThread({
            id: 'thread-123',
            owner: 'dicoding',
        })).toThrowError('ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_TITLE_ADDEDTHREAD');
    });

    it('should throw authentication error when payload dont have owner', () => {
        expect(() => new AddedThread({
            id: 'thread-123',
            title: 'sample title',
        })).toThrowError('ADDEDTHREAD.NOT_HAVE_NEEDED_AUTHNENTICATION_OWNER');
    });


    it('should create AddedThread entity', () => {
        const thread = new AddedThread({
            id: 'thread-123',
            title: 'sample title',
            owner: 'dicoding',
        });
        expect(thread.id).toEqual('thread-123');
        expect(thread.title).toEqual('sample title');
        expect(thread.owner).toEqual('dicoding');
    });
});