const CommentThread = require('../../../Domains/threads/entities/commentThread');
const commentedThread = require('../../../Domains/threads/entities/commentedThread');
const CommentThreadUseCase = require('../CommentThreadUseCase');
const CommentThreadRepository = require('../../../Domains/threads/CommentThreadRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');


describe('commentThreadUseCase', () => {
    it('should add comment successfully', async () => {
        const commentPayload = {
            content: 'content comment thread',
        }
        const params = {
            threadid: 'thread-123'
        };
        const owneruser = 'dicoding';

        const mockcommentedThread = new commentedThread({
            id: 'comment-123',
            content: commentPayload.content,
            owner: 'dicoding',
        });


        /** creating dependency of use case */
        const mockCommentThreadRepository = new CommentThreadRepository();
        const mockThreadRepository = new ThreadRepository();

        /** mocking needed function */
        mockCommentThreadRepository.commentThread = jest.fn()
            .mockImplementation(() => Promise.resolve(
                mockcommentedThread
            ));
        mockThreadRepository.verifyThreadAvailability = jest.fn()
            .mockImplementation(() => Promise.resolve({
                id: 'thread-123',
                title: 'sample title',
                owner: 'dicoding',
            }));



        const commentThreadUseCase = new CommentThreadUseCase({
            commentThreadRepository: mockCommentThreadRepository,
            threadRepository: mockThreadRepository,
        });

        const comentedAdded = await commentThreadUseCase.execute(commentPayload, owneruser, params);
        expect(comentedAdded).toStrictEqual(new commentedThread({
            id: 'comment-123',
            content: commentPayload.content,
            owner: 'dicoding',
        }));

        expect(mockThreadRepository.verifyThreadAvailability).toBeCalledWith(params.threadid);
        expect(mockCommentThreadRepository.commentThread).toBeCalledWith(new CommentThread({
            threadid: 'thread-123',
            content: commentPayload.content,
            owner: 'dicoding',
        }));



    });
});