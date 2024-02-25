const CommentThread = require("../../Domains/threads/entities/commentThread");

class CommentThreadUseCase {
    constructor({ commentThreadRepository, authenticationTokenManager }) {
        this._commentThreadRepository = commentThreadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
    }
    async execute(commentPayload, id, params) {
        const owner = await this._authenticationTokenManager.decodePayload(id);
        const updateCommentPayload = await this._verifyThreadAvailability(params, commentPayload, owner)
        const commentThread = new CommentThread(updateCommentPayload);
        return this._commentThreadRepository.commentThread(commentThread);
    }
    async _verifyThreadAvailability(params, commentPayload, owner) {
        const { threadid } = params;
        const findedthreadid = await this._commentThreadRepository.verifyThreadAvailability(threadid);
        commentPayload.owner = owner.username;
        commentPayload.threadid = findedthreadid.id;
        return commentPayload;

    }
}
module.exports = CommentThreadUseCase