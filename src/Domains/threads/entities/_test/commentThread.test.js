const CommentThread = require('../commentThread');

describe('commentThread', () => {
    it('should throw an error when no content not type of string', () => {
        //assertian
        const payload = {
            threadid: 'thread-123',
            content: true,
            owner: 'dicoding',
        };

        //action and assertian
        expect(() => new CommentThread(payload)).toThrowError('COMMENTTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw an error when comment more than 50 characters', () => {
        //assertian
        const payload = {
            threadid: 'thread-123',
            content: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
            owner: 'dicoding',
        };

        //action and assert
        expect(() => new CommentThread(payload)).toThrowError('COMMENTTHREAD.CONTENT_LIMIT_CHAR');
    });

    it('should throw an error when no have payload in owner', () => {
        //assertian
        const payload = {
            threadid: 'thread-123',
            content: 'content comment thread',
            owner: 123,
        };

        //action and assert
        expect(() => new CommentThread(payload)).toThrowError('COMMMENTTHREAD.NOT_CONTAIN_NEEDED_AUTHENTICATION');
    });
    it('should throw an error when no have payload in owner', () => {
        //assertian
        const payload = {
            content: 'content comment thread',
            owner: 'dicoding',
        };

        //action and assert
        expect(() => new CommentThread(payload)).toThrowError('COMMMENTTHREAD.NOT_CONTAIN_THREADID_PROPERTY');
    });
    it('should throw an error when no have payload in owner', () => {
        //assertian
        const payload = {
            threadid: 'thread-123',
            owner: 'dicoding',
        };

        //action and assert
        expect(() => new CommentThread(payload)).toThrowError('COMMMENTTHREAD.NOT_CONTAIN_CONTENT_PROPERTY');
    });
    it('should throw an error when no have payload in owner', () => {
        //assertian
        const payload = {
            threadid: 'thread-123',
            content: 'content comment thread',
        };

        //action and assert
        expect(() => new CommentThread(payload)).toThrowError('COMMMENTTHREAD.NOT_CONTAIN_NEEDED_AUTHENTICATION');
    });





    it('should paylod for inserting comment correctly', () => {
        //assertian
        const payload = {
            threadid: 'thread-123',
            content: 'content comment thread',
            owner: 'dicoding',
        };

        const { threadid, content, owner } = new CommentThread(payload);

        // Assert
        expect(threadid).toEqual(payload.threadid);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);

    });
});