const CommentThread = require("../../Domains/threads/entities/commentThread");

class CommentThreadUseCase {
    constructor({ commentThreadRepository, authenticationTokenManager }) {
        this._commentThreadRepository = commentThreadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
    }
    async execute(commentPayload, authorizationPayload, params) {
        const owner = await this._authenticationTokenManager.decodePayload(authorizationPayload.authorization);

        const findedthreadid = await this._commentThreadRepository.findThread(params.threadid);


        commentPayload.owner = owner.username;
        commentPayload.threadid = findedthreadid.id;

        const commentThread = new CommentThread(commentPayload);

        return this._commentThreadRepository.commentThread(commentThread);
    }
}
module.exports = CommentThreadUseCase