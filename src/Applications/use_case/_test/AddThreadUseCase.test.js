/**domain selesai 
setelah itu buat alur usercase untuk add thread successfully
penting untuk menambahkan  : 
1. addthread domain untuk cek payload sebelum masuk threadrepository 
2. masuk ke addedthread untuk mengecek return dari threadrepository
3. threadreposotory dari domain yang ada untuk berjalan sebagai mockAuthenticationTokenManager 
4. dependencies apa yang di butuhkan untuk di mock seperti (authentticatuin / threadrepository) 

setelah ini lanjut ke ADDTHREADUSECASE*/


const AddThread = require('../../../Domains/threads/entities/addthread');
const AddedThread = require('../../../Domains/threads/entities/addedthread');
const AddThreadUseCase = require('../AddThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
// const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('AddThreadUseCase', () => {
    it('should add a thread successfully', async () => {

        //siapkan payload yang sesuai dengan handler yang akan datang
        // Arrange
        const threadPayload = {
            title: 'sample title',
            body: 'body Thread',
        };

        const owneruser = 'dicoding';

        //mocked setelah proses repository lolos maka akan di test dengan domain added thread
        const mockThreadAdded = new AddedThread({
            id: 'thread-123',
            title: 'sample title',
            owner: 'dicoding',
        });



        //membuat dependency untuk usecase yang akan di gunakan function apa yang akan digunakan dan mock apa yang digunakan 
        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();
        // const mockAuthenticationTokenManager = new AuthenticationTokenManager();


        //gunakan mock dependencies dengan payload sesuai dengan ouput usecases yang ada 
        /** mocking needed function */
        mockThreadRepository.addThread = jest.fn()
            .mockImplementation(() => Promise.resolve(
                mockThreadAdded
            ));

        //seharusnya ada test domain untuk result decode ini tambahkan
        // mockAuthenticationTokenManager.decodePayload = jest.fn()
        //     .mockImplementation(() => Promise.resolve(
        //         owner
        //     )); // Payload hanya berisi id



        //kita gunakan usecase yang ada untuk dipakai di usecase sesuai kebutuhan contohnya addthreadusecase
        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
            // authenticationTokenManager: mockAuthenticationTokenManager,
        });

        //jalankan dan akan menjalankan di usecase serta akan mengirimkan sesuai usecase addthreadusecase 
        // Action
        const threadAdded = await addThreadUseCase.execute(threadPayload, owneruser);
        //nilai yang di harapkan di test dengan domain addedthread
        // Assert
        expect(threadAdded).toStrictEqual(new AddedThread({
            id: 'thread-123',
            title: 'sample title',
            owner: 'dicoding',
        }));

        //usecase diharapkan berjalan sesuai dengan usecase proses berjalan
        // expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(owneruser);

        //ketika ingin di proses di repository nilai yang diharapkan sesuai dengan addthread domain 
        expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
            title: threadPayload.title,
            body: threadPayload.body,
            owner: owneruser,
        }));
    });
});
