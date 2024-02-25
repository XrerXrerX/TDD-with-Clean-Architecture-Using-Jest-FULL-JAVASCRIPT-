
class GetCommentThreadUseCase {
    constructor({ commentThreadRepository, threadRepository }) {
        this._commentThreadRepository = commentThreadRepository;
        this._threadRepository = threadRepository;
    }
    async execute(params) {
        const getThreads = await this._threadRepository.getThread(params.threadId);
        const updatedThreads = getThreads.map(thread => {
            const { owner, created_at, ...threadWithoutOwner } = thread; // Menggunakan destructuring untuk menghapus properti owner
            return {
                ...threadWithoutOwner,
                username: owner, // Menggunakan nilai owner sebagai username,
                date: created_at
            };
        });
        const getComments = await this._commentThreadRepository.getComment(params.threadId);
        const updatedComments = getComments.map(comment => {
            const { owner, created_at, content, is_delete, ...commentWithoutOwner } = comment; // Menggunakan destructuring untuk menghapus properti owner
            let updatedContent = content;
            // Periksa apakah komentar telah dihapus
            if (is_delete == true || is_delete == 'true') {
                updatedContent = '**komentar telah dihapus**';
            }

            return {
                ...commentWithoutOwner,
                is_delete,
                content: updatedContent,
                username: owner, // Menggunakan nilai owner sebagai username
                date: created_at
            };
        });
        updatedThreads[0].comments = updatedComments;

        return updatedThreads[0];
    };
};
module.exports = GetCommentThreadUseCase