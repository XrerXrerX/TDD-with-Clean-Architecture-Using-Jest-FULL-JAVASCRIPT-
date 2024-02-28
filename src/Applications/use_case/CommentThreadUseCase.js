const CommentThread = require("../../Domains/threads/entities/commentThread");

class CommentThreadUseCase {
    constructor({ commentThreadRepository, authenticationTokenManager, threadRepository }) {
        this._commentThreadRepository = commentThreadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
        this._threadRepository = threadRepository;
    }
    async execute(commentPayload, owneruser, params) {
        const updateCommentPayload = await this._verifyThreadAvailability(params, commentPayload, owneruser)
        const commentThread = new CommentThread(updateCommentPayload);
        return this._commentThreadRepository.commentThread(commentThread);
    }
    async _verifyThreadAvailability(params, commentPayload, owneruser) {
        const { threadid } = params;
        await this._threadRepository.verifyThreadAvailability(threadid);
        commentPayload.owner = owneruser;
        commentPayload.threadid = threadid;
        return commentPayload;

    }
}
module.exports = CommentThreadUseCase