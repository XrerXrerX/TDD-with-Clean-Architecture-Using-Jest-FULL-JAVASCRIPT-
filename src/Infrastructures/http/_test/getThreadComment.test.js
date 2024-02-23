const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const CommentThreadsTableTestHelper = require('../../../../tests/CommentThreadsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('/threads/{threadId}/comments/{commentId}', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await CommentThreadsTableTestHelper.cleanTable();
        await AuthenticationsTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();

    }); //


    describe('send authenctication when no have headers in payload', () => {
        it('should send authentication error when no have headers in payload', async () => {
            const server = await createServer(container);

            //Arrange
            const threadId = 'thread-122';

            const response = await server.inject({
                method: 'GET',
                url: `/threads/${threadId}`,
            })
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Thread not found');

        });

    });
    describe(' when GET THREAD AND COMMENT  /threads/{threadId}/comments/{commentId}', () => {
        it('should response 201 and persisted comment', async () => {

            const server = await createServer(container);
            const threadId = 'thread-123334';

            await ThreadsTableTestHelper.addThread({ id: 'thread-123334' });
            await CommentThreadsTableTestHelper.commentThread({ id: 'comment-111' });
            await CommentThreadsTableTestHelper.commentThread({ id: 'comment-222' });

            const response = await server.inject({
                method: 'GET',
                url: `/threads/${threadId}`,

            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.thread).toBeDefined();
        });
    });
}); 