const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');


describe('/users endpoint', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
        await AuthenticationsTableTestHelper.cleanTable();
    });

    describe('when Post /threads', () => {
        it('should response 201 and persisted thread', async () => {
            //Arrange
            const server = await createServer(container);
            // add user
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


            //eslint-disable-next-line no-undef
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: threadPayload,
                headers: {
                    authorization: 'bearer ' + refreshToken,
                },
            })

            // Assert
            const responseJson = JSON.parse(response.payload);

            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedThread).toBeDefined();

        });


        it('should throw error 400 when bad payload not fulfilled', async () => {
            {
                const server = await createServer(container);
                // add user
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


                //Arrange
                threadPayload = {
                    body: 'body Thread',
                }
                const response = await server.inject({
                    method: 'POST',
                    url: '/threads',
                    payload: threadPayload,
                    headers: {
                        authorization: 'Bearer ' + refreshToken,
                    },
                })

                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('title not found in add thread');
            }
        });

        it('should throw error 400 when bad payload not fulfilled', async () => {
            {
                const server = await createServer(container);
                // add user
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


                //Arrange
                threadPayload = {
                    title: 'sample title',
                }

                const response = await server.inject({
                    method: 'POST',
                    url: '/threads',
                    payload: threadPayload,
                    headers: {
                        authorization: 'Bearer ' + refreshToken,
                    },
                })


                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('body not found in add thread');
            }
        });
    });
    describe('send authenctication when no have headers in payload', () => {
        it('should send authentication error when no have headers in payload', async () => {
            const server = await createServer(container);

            //Arrange
            threadPayload = {
                title: 'sample title',
                body: 'body Thread',
            };

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
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
});