//pertama membuat ini untuk testing payload ketika ingin melakukan input data ke threadrepository

//setelah ini lanjut ke ThreadRepository.js di domain untuk function yang berjalan

const GetThread = require('../GetThread');

describe('Thread Entity', () => {


    it('should throw an error bad payload when no have data ', () => {
        //assertions
        const payload = {};

        //actions and assertions
        expect(() => new GetThread(payload)).toThrowError('GET_DATA_THREAD.NO_HAVE_DATA_TO_SERVE');
    });

    //nilai yang di harapkan dan lolos     
    it('should create a thread entity', () => {
        const getThread = new GetThread({
            id: 'thread-123',
            title: 'sebuah thread',
            body: 'sebuah body thread',
            owner: 'user-123',
            created_at: '2021-08-08T07:19:09.775Z'

        });
        expect(getThread.id).toEqual('thread-123');
        expect(getThread.title).toEqual('sebuah thread');
        expect(getThread.body).toEqual('sebuah body thread');
        expect(getThread.owner).toEqual('user-123');
        expect(getThread.created_at).toEqual('2021-08-08T07:19:09.775Z');


    });
});