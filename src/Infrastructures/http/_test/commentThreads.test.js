const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const CommentThreadsTableTestHelper = require('../../../../tests/CommentThreadsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');

describe('/thread/threadid/comments', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await CommentThreadsTableTestHelper.cleanTable();
        await AuthenticationsTableTestHelper.cleanTable();

    }); //


    describe('send authenctication when no have headers in payload', () => {
        it('should send authentication error when no have headers in payload', async () => {
            const server = await createServer(container);

            //Arrange
            threadPayload = {
                content: 'content comment thread',

            };

            const response = await server.inject({
                method: 'POST',
                url: '/threads/{threadid}/comments',
                payload: threadPayload,
                headers: {
                    authorization: '',
                },
            })
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Missing authentication');

        });

    });
    describe(' when add comment  /thread/threadid/comments', () => {
        it('should response 201 and persisted comment', async () => {

            const server = await createServer(container);

            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                    fullname: 'Dicoding2 Indonesia',
                },
            });


            // login user
            const loginResponse = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                },
            });

            const { data: { refreshToken } } = JSON.parse(loginResponse.payload);

            threadPayload = {
                title: 'sample title',
                body: 'body Thread',
            };


            const threadresponse = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: threadPayload,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            })

            const { data: { addedThread } } = JSON.parse(threadresponse.payload);
            const threadid = addedThread.id;

            const requestPayload = {
                content: 'content comment thread',
            };
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadid}/comments`,
                payload: requestPayload,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedComment).toBeDefined();
        });

        it('should send response 404 if thread not found', async () => {
            const server = await createServer(container);

            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                    fullname: 'Dicoding2 Indonesia',
                },
            });


            // login user
            const loginResponse = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                },
            });

            const { data: { refreshToken } } = JSON.parse(loginResponse.payload);

            threadPayload = {
                title: 'sample title',
                body: 'body Thread',
            };


            await server.inject({
                method: 'POST',
                url: '/threads',
                payload: threadPayload,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            })

            const threadid = 'xxx';


            const requestPayload = {
                content: 'content comment thread',
            };
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadid}/comments`,
                payload: requestPayload,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('thread not found');
        });


        it('should send response 400 if content not a string', async () => {
            const server = await createServer(container);

            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                    fullname: 'Dicoding2 Indonesia',
                },
            });


            // login user
            const loginResponse = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                },
            });

            const { data: { refreshToken } } = JSON.parse(loginResponse.payload);

            threadPayload = {
                title: 'sample title',
                body: 'body Thread',
            };


            const threadresponse = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: threadPayload,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            })


            const { data: { addedThread } } = JSON.parse(threadresponse.payload);
            const threadid = addedThread.id;

            const requestPayload = {
                content: true,
            };
            const response = await server.inject({
                method: 'POST',
                url: `/threads/${threadid}/comments`,
                payload: requestPayload,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Type data tidak sesuai');
        });
    }); //

    describe('DELETE COMMENT /threads/{threadId}/comments/{commentId}', () => {
        it('should send authentication error when delete no have authorizations', async () => {
            const server = await createServer(container);

            // const refreshToken = 'refresh_token';
            const threadId = 'thread-123';
            const commentId = 'comment-123';
            const refreshToken = '';
            await AuthenticationsTableTestHelper.addToken(refreshToken);

            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                headers: {
                    authorization: '',
                },
            });
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Missing authentication');
        });

        it('should can soft delete commens', async () => {
            const server = await createServer(container);


            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                    fullname: 'Dicoding2 Indonesia',
                },
            });


            // login user
            const loginResponse = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: {
                    username: 'dicoding_thread',
                    password: 'secret_thread',
                },
            });

            const { data: { refreshToken } } = JSON.parse(loginResponse.payload);

            const threadId = 'thread-321';
            const commentId = 'comment-888';

            await ThreadsTableTestHelper.addThread({ id: 'thread-321' });
            await CommentThreadsTableTestHelper.commentThread({ id: 'comment-999', threadid: 'thread-321' });
            await CommentThreadsTableTestHelper.commentThread({ id: 'comment-888', threadid: 'thread-321' });

            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
        });
    });


});