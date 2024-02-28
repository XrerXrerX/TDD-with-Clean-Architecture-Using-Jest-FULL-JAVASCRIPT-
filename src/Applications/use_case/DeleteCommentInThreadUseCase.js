class DeleteCommentInThreadUseCase {
    constructor({ commentThreadRepository, }) {
        this._commentThreadRepository = commentThreadRepository;
    }
    async execute(params, owneruser) {
        this._validatePayload(owneruser);
        await this._commentThreadRepository.deleteComment(params);
        await this._commentThreadRepository.VerifyDeleteComment(params, owneruser);

    };
    _validatePayload(owneruser) {
        if (!owneruser || owneruser === undefined || owneruser === null) {
            throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_HAVE_AUTHENTICATION');
        }

    }
};
module.exports = DeleteCommentInThreadUseCase;