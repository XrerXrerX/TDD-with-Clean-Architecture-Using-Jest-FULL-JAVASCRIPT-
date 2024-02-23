class DeleteCommentInThreadUseCase {
    constructor({ commentThreadRepository, authenticationTokenManager, authenticationRepository }) {
        this._commentThreadRepository = commentThreadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
        this._authenticationRepository = authenticationRepository;
    }
    async execute(params, useCasePayload) {
        this._validatePayload(useCasePayload);

        const headersmock = useCasePayload.authorization.split(' ')[1];
        useCasePayload.authorization = headersmock
        const reqowner = await this._authenticationTokenManager.decodePayload(useCasePayload.authorization);

        await this._commentThreadRepository.deleteComment(params, reqowner);
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