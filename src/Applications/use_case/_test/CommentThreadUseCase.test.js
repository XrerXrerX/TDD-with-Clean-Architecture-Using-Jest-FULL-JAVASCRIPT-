const CommentThread = require('../../../Domains/threads/entities/commentThread');
const commentedThread = require('../../../Domains/threads/entities/commentedThread');
const CommentThreadUseCase = require('../CommentThreadUseCase');
const CommentThreadRepository = require('../../../Domains/threads/CommentThreadRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('commentThreadUseCase', () => {
    it('should add comment successfully', async () => {
        const commentPayload = {
            content: 'content comment thread',
        }
        const params = {
            threadid: 'thread-123'
        };
        const id = 'mockAccessToken';

        const mockcommentedThread = new commentedThread({
            id: 'comment-123',
            content: commentPayload.content,
            owner: 'dicoding',
        });


        /** creating dependency of use case */
        const mockCommentThreadRepository = new CommentThreadRepository();
        const mockAuthenticationTokenManager = new AuthenticationTokenManager();

        /** mocking needed function */
        mockCommentThreadRepository.commentThread = jest.fn()
            .mockImplementation(() => Promise.resolve(
                mockcommentedThread
            ));
        mockCommentThreadRepository.verifyThreadAvailability = jest.fn()
            .mockImplementation(() => Promise.resolve({
                id: 'thread-123',
                title: 'sample title',
                owner: 'dicoding',
            }));
        mockAuthenticationTokenManager.decodePayload = jest.fn()
            .mockImplementation(() => Promise.resolve({
                username: 'dicoding',
                id: 'user-123',
            })); // Payload hanya berisi id


        const commentThreadUseCase = new CommentThreadUseCase({
            commentThreadRepository: mockCommentThreadRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });

        const comentedAdded = await commentThreadUseCase.execute(commentPayload, id, params);
        expect(comentedAdded).toStrictEqual(new commentedThread({
            id: 'comment-123',
            content: commentPayload.content,
            owner: 'dicoding',
        }));

        expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(id);
        expect(mockCommentThreadRepository.verifyThreadAvailability).toBeCalledWith(params.threadid);
        expect(mockCommentThreadRepository.commentThread).toBeCalledWith(new CommentThread({
            threadid: 'thread-123',
            content: commentPayload.content,
            owner: 'dicoding',
        }));



    });
});