const CommentedThread = require('../commentedThread');


describe('commentedThread', () => {
    it('should throw error when no have id in comment', () => {
        // Arrange
        const comentPayload = {
            content: 'content comment thread',
            owner: 'dicoding',
        };

        // Action and Assert
        expect(() => new CommentedThread(comentPayload)).toThrowError('COMENTEDTHREAD.NOT_HAVE_ID_FOR_FIND_THREAD');
    });
    it('should throw error when no have content in comment', () => {
        // Arrange
        const comentPayload = {
            id: 'comment-123',
            owner: 'dicoding',
        };

        // Action and Assert
        expect(() => new CommentedThread(comentPayload)).toThrowError('COMENTEDTHREAD.NOT_HAVE_CONTENT_FOR_FIND_THREAD');
    });

    it('should throw error when id is not tyoe of string', () => {
        // Arrange
        const comentPayload = {
            id: true,
            content: 'content comment thread',
            owner: 'dicoding',
        };

        // Action and Assert
        expect(() => new CommentedThread(comentPayload)).toThrowError('COMENTEDTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should throw error when content is not tyoe of string', () => {
        // Arrange
        const comentPayload = {
            id: 'comment-123',
            content: {},
            owner: 'dicoding',
        };

        // Action and Assert
        expect(() => new CommentedThread(comentPayload)).toThrowError('COMENTEDTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });



    it('should throw error when owner is not tyoe of string', () => {
        // Arrange
        const comentPayload = {
            id: 'comment-123',
            content: 'content comment thread',
            owner: {},
        };

        // Action and Assert
        expect(() => new CommentedThread(comentPayload)).toThrowError('COMENTEDTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when no have owner for identity authentication', () => {
        // Arrange
        const comentPayload = {
            id: 'comment-123',
            content: 'content comment thread',
        };

        // Action and Assert
        expect(() => new CommentedThread(comentPayload)).toThrowError('COMENTEDTHREAD.NOT_HAVE_OWNER_FOR_AUTHENTICATION');
    });



    it('should create comentedThread object correctly ', () => {
        // Arrange
        const comentPayload = {
            id: 'comment-123',
            content: 'content comment thread',
            owner: 'dicoding',
        };
        //action
        const commentedThread = new CommentedThread(comentPayload);

        // Assert
        expect(commentedThread.id).toEqual(comentPayload.id);
        expect(commentedThread.content).toEqual(comentPayload.content);
        expect(commentedThread.owner).toEqual(comentPayload.owner);


    });
});