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
                    username: 'dicoding',
                    password: 'secret_thread',
                    fullname: 'Dicoding2 Indonesia',
                },
            });


            const loginResponse = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: {
                    username: 'dicoding',
                    password: 'secret_thread',
                },
            });

            const { data: { accessToken } } = JSON.parse(loginResponse.payload);

            const threadpayload = {
                title: 'sample title',
                body: 'body thread'
            };

            //eslint-disable-next-line no-undef
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: threadpayload,
                headers: {
                    authorization: 'Bearer ' + accessToken,
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
                        username: 'dicoding',
                        password: 'secret_thread',
                        fullname: 'Dicoding2 Indonesia',
                    },
                });


                const loginResponse = await server.inject({
                    method: 'POST',
                    url: '/authentications',
                    payload: {
                        username: 'dicoding',
                        password: 'secret_thread',
                    },
                });

                const { data: { accessToken } } = JSON.parse(loginResponse.payload);

                const threadpayload = {
                    title: 'sample title',
                };

                //eslint-disable-next-line no-undef
                const response = await server.inject({
                    method: 'POST',
                    url: '/threads',
                    payload: threadpayload,
                    headers: {
                        authorization: 'Bearer ' + accessToken,
                    },

                })


                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('bad payload inserted');
            }
        });

    });
});