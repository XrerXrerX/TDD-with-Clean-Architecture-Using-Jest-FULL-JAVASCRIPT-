const CommentThreadRepository = require('../../../Domains/threads/CommentThreadRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const DeleteCommentInThreadUseCase = require('../DeleteCommentInThreadUseCase');

describe('DeleteAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const owneruser = null;

    const params = {
      threadId: 'thread-123456789',
      commentId: 'comment-123456789',
    }
    const deleteCommentInThreadUseCase = new DeleteCommentInThreadUseCase({});

    // Action & Assert
    await expect(deleteCommentInThreadUseCase.execute(params, owneruser))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_HAVE_AUTHENTICATION');
  });

  it('should orchestrating the delete authentication action correctly', async () => {
    // Arrange
    const owneruser = 'dicoding';

    const params = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    }
    const mockcommentThreadRepository = new CommentThreadRepository();

    mockcommentThreadRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockcommentThreadRepository.VerifyDeleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentInThreadUseCase = new DeleteCommentInThreadUseCase({
      commentThreadRepository: mockcommentThreadRepository,
    });

    // Act
    await deleteCommentInThreadUseCase.execute(params, owneruser);

    // Assert
    expect(mockcommentThreadRepository.VerifyDeleteComment)
      .toHaveBeenCalledWith(params, owneruser);
    expect(mockcommentThreadRepository.deleteComment)
      .toHaveBeenCalledWith(params);
  });
});
