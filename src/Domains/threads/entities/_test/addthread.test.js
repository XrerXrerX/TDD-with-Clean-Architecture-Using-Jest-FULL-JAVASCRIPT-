//pertama membuat ini untuk testing payload ketika ingin melakukan input data ke threadrepository

//setelah ini lanjut ke ThreadRepository.js di domain untuk function yang berjalan

const AddThread = require('../addthread');

describe('Thread Entity', () => {


    it('should throw an error bad payload when no title inserted', () => {
        //assertions
        const payload = {
            // id: 'thread-123',
            body: 'body Thread',
            owner: 'dicoding',
        };

        //actions and assertions
        expect(() => new AddThread(payload)).toThrowError('THREAD.NO_HAVE_TITLE_IN_ADDTHREAD');
    });
    it('should throw an error bad payload when no body in payload inserted', () => {
        //assertions
        const payload = {
            // id: 'thread-123',
            title: 'sample title',
            owner: 'dicoding',
        };

        //actions and assertions
        expect(() => new AddThread(payload)).toThrowError('THREAD.NO_HAVE_BODY_IN_ADDTHREAD');
    });

    it('should throw an error bad payload when no have owner for authentication inserted', () => {
        //assertions
        const payload = {
            // id: 'thread-123',
            title: 'sample title',
            body: 'body Thread',
        };
        //actions and assertions
        expect(() => new AddThread(payload)).toThrowError('THREAD.NO_HAVE_OWNER_FOR_AUTHENTICATION_IN_ADDTHREAD');
    });


    //nilai yang di harapkan dan lolos     
    it('should create a thread entity', () => {
        const thread = new AddThread({
            title: 'sample title',
            body: 'body Thread',
            owner: 'dicoding',
        });
        expect(thread.title).toEqual('sample title');
        expect(thread.body).toEqual('body Thread');
        expect(thread.owner).toEqual('dicoding');

    });
});