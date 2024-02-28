class DeleteCommentInThreadUseCase {
    constructor({ commentThreadRepository, authenticationTokenManager }) {
        this._commentThreadRepository = commentThreadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
    }
    async execute(params, useCasePayload) {
        this._validatePayload(useCasePayload);

        const headersmock = useCasePayload.authorization.split(' ')[1];
        useCasePayload.authorization = headersmock
        const reqowner = await this._authenticationTokenManager.decodePayload(useCasePayload.authorization);
        await this._commentThreadRepository.deleteComment(params);
        await this._commentThreadRepository.VerifyDeleteComment(params, reqowner);

    };
    _validatePayload(payload) {
        const { authorization } = payload;
        if (!authorization || authorization === undefined || authorization === null) {
            throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_HAVE_AUTHENTICATION');
        }

        if (typeof authorization !== 'string') {
            throw new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
};
module.exports = DeleteCommentInThreadUseCase;