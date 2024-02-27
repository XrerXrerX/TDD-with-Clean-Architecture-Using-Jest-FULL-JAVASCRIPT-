const CommentThread = require("../../Domains/threads/entities/commentThread");

class CommentThreadUseCase {
    constructor({ commentThreadRepository, authenticationTokenManager, threadRepository }) {
        this._commentThreadRepository = commentThreadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
        this._threadRepository = threadRepository;
    }
    async execute(commentPayload, id, params) {
        const owner = await this._authenticationTokenManager.decodePayload(id);
        const updateCommentPayload = await this._verifyThreadAvailability(params, commentPayload, owner)
        const commentThread = new CommentThread(updateCommentPayload);
        return this._commentThreadRepository.commentThread(commentThread);
    }
    async _verifyThreadAvailability(params, commentPayload, owner) {
        const { threadid } = params;
        const findedthreadid = await this._threadRepository.verifyThreadAvailability(threadid);
        commentPayload.owner = owner.username;
        commentPayload.threadid = findedthreadid.id;
        return commentPayload;

    }
}
module.exports = CommentThreadUseCase