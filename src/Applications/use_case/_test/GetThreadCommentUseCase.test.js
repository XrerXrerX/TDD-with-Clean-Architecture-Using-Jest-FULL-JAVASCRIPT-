
const CommentThreadRepository = require('../../../Domains/threads/CommentThreadRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const GetThreadCommentUseCase = require('../GetThreadCommentUseCase');
const GetThread = require('../../../Domains/threads/entities/GetThread');


describe('GetcommentThreadUseCase', () => {
    it('should get data thread and comment successfully', async () => {

        const params = {
            threadId: 'thread-123'
        };

        const mockDataThreadComment = new GetThread({
            id: 'thread-123',
            title: 'sebuah thread',
            body: 'sebuah body thread',
            owner: 'user-123',
            created_at: '2021-08-08T07:19:09.775Z'
        });

        // Perbarui mockDataThreadComment menjadi sebuah array yang berisi objek dengan properti comments
        const mockDataThreadCommentWithComments = [
            {
                ...mockDataThreadComment,
                comments: [] // Atau Anda dapat menambahkan komentar di sini jika perlu
            }
        ];
        const mockDataComment = (
            [
                {
                    id: "comment-123",
                    threadid: 'thread-123',
                    content: 'sebuah comment',
                    owner: 'johndoe',
                    is_delete: null,
                    created_at: '2024-02-23T03:37:21.097Z'
                },
                {
                    id: "comment-124",
                    threadid: 'thread-123',
                    content: 'sebuah comment',
                    is_delete: true,
                    owner: 'dicoding',
                    created_at: '2021-08-08T07:22:33.555Z'
                }
            ]
        );


        // const mockDataCommentThreadComment = ({
        //     id: 'thread-123',
        //     title: 'sebuah thread',
        //     body: 'sebuah body thread',
        //     date: "2021-08-08T07:19:09.775Z",
        //     username: 'user-123',
        //     comments: ([{
        //         id: "comment-123",
        //         username: "johndoe",
        //         date: '2024-02-23T03:37:21.097Z',
        //         is_delete: null,
        //         threadid: "thread-123",
        //         content: "sebuah comment"
        //     },
        //     {
        //         id: "comment-124",
        //         username: "dicoding",
        //         date: '2021-08-08T07:22:33.555Z',
        //         is_delete: true,
        //         threadid: "thread-123",
        //         content: "**komentar telah dihapus**"
        //     }])
        // })

        const mockThreadRepository = new ThreadRepository();
        const mockCommentThreadRepository = new CommentThreadRepository();

        // Perbarui mockThreadRepository untuk mengembalikan mockDataThreadCommentWithComments sebagai sebuah array
        mockThreadRepository.getThread = jest.fn()
            .mockImplementation(() => Promise.resolve(
                mockDataThreadCommentWithComments
            ));

        mockCommentThreadRepository.getComment = jest.fn()
            .mockImplementation(() => Promise.resolve(
                mockDataComment
            ));




        const getThreadCommenUsecase = new GetThreadCommentUseCase({
            threadRepository: mockThreadRepository,
            commentThreadRepository: mockCommentThreadRepository,
        });

        await getThreadCommenUsecase.execute(params);
        // const mockdatacommentdeleted = getdata.comments.map(comment => {
        //     const { content, is_delete, ...commentWithoutOwner } = comment; // Menggunakan destructuring untuk menghapus properti owner
        //     let updatedContent = content;
        //     // Periksa apakah komentar telah dihapus
        //     if (is_delete == true) {
        //         updatedContent = '**komentar telah dihapus**';
        //     }

        //     return {
        //         ...commentWithoutOwner,
        //         is_delete,
        //         content: updatedContent,
        //     };
        // });
        // getdata.comments = mockdatacommentdeleted;

        // expect(getdata).toStrictEqual(
        //     mockDataCommentThreadComment
        // );

        // Periksa apakah mockThreadRepository.getThread dipanggil dengan parameter yang benar
        expect(mockThreadRepository.getThread).toBeCalledWith(params.threadId);
        expect(mockCommentThreadRepository.getComment).toBeCalledWith(params.threadId);
    });
});

