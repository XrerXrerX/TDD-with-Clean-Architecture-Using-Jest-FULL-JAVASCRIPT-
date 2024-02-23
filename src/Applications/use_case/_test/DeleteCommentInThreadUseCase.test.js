const CommentThreadRepository = require('../../../Domains/threads/CommentThreadRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const DeleteCommentInThreadUseCase = require('../DeleteCommentInThreadUseCase');

describe('DeleteAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {};



    const params = {
      threadId: 'thread-123456789',
      commentId: 'comment-123456789',
    }
    const deleteCommentInThreadUseCase = new DeleteCommentInThreadUseCase({});

    // Action & Assert
    await expect(deleteCommentInThreadUseCase.execute(params, useCasePayload))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_HAVE_AUTHENTICATION');
  });

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      authorization: 123,
    };

    const params = {
      threadId: 'thread-123456789',
      commentId: 'comment-123456789',
    }
    const deleteCommentInThreadUseCase = new DeleteCommentInThreadUseCase({});

    // Action & Assert
    await expect(deleteCommentInThreadUseCase.execute(params, useCasePayload))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      authorization: 'refreshToken',
    };

    const params = {
      threadId: 'thread-123456789',
      commentId: 'comment-123456789',
    }
    const mockauthenticationTokenManager = new AuthenticationTokenManager();
    const mockcommentThreadRepository = new CommentThreadRepository();
    mockauthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockcommentThreadRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentInThreadUseCase = new DeleteCommentInThreadUseCase({
      authenticationTokenManager: mockauthenticationTokenManager,
      commentThreadRepository: mockcommentThreadRepository,
    });

    // Act
    await deleteCommentInThreadUseCase.execute(params, useCasePayload);

    // Assert
    expect(mockauthenticationTokenManager.decodePayload)
      .toHaveBeenCalledWith(useCasePayload.authorization);
    expect(mockcommentThreadRepository.deleteComment)
      .toHaveBeenCalledWith(params);
  });
});
