/**setelah dari addthreadUsecaseJS
 * ****************************************************************
 * require domain add dan added thread serta repository untuk hulu untuk menguhi testing
 * threadtabletesthelper untuk membantu validasi di database nanti ketika testing
 * buat dahulu tablehelper 
 */

const AddThread = require('../../../Domains/threads/entities/addthread');
const AddedThread = require('../../../Domains/threads/entities/addedthread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');


describe('ThreadRepository', () => {
  //wajib gunakan aftereach dan after all untuk testing 
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });
  describe('added thread successfully', () => {
    //mengcek validasi yang dikirimkan addthreadusecase bisa di masukan ke database dengan teting tabbble 

    it('should persist add thread return addedthread user correctly', async () => {
      // Arrange
      const addThread = new AddThread({
        title: 'sample title',
        body: 'body Thread',
        owner: 'user-123',
      });

      //menggunakan stub
      const fakeIdGenerator = () => '123'; //stub

      //new object untuk menjlankan denagn segala dependenciesnya 
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);


      //gunakan object yang sudah ada depenciesnya gunakan await kalau sudah siap bisa diguankan 
      // Action
      await threadRepository.addThread(addThread);


      //gunakan usertable dan buatkan class yang inigin di buat untuk pengecekan sesuai
      // Assert
      const thread = await ThreadsTableTestHelper.findOwner('thread-123');
      expect(thread).toHaveLength(1);
    });


    //sudah oke lalu mengirimkan sesuai yang diminta oleh testing addedthread
    it('should correctly add thread and return added thread ', async () => {
      const addThread = new AddThread({
        title: 'sample title',
        body: 'body Thread',
        owner: 'dicoding',
      });
      const fakeIdGenerator = () => '123';
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const addedThread = await threadRepository.addThread(addThread);
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'sample title',
        owner: 'dicoding',
      }));
    });
  });

  describe('authentication for threadRepository', () => {
    it('should send authentication error when no owner provided', async () => {
      // Arrange
      const addThread = {
        title: 'sample title',
        body: 'body Thread',
        owner: '', // owner tidak diberikan
      };
      const fakeIdGenerator = () => '123';

      //ketika tidak ada maka kirimkan authentication error 
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action and assertion
      await expect(threadRepository.addThread(addThread)).rejects.toThrowError(AuthenticationError);
    });
  });

  describe('GET DATA THREAD', () => {
    it('should return data thread successfully', async () => {
      const params = {
        threadId: 'thread-123'
      }


      // //menggunakan stub
      // const fakeIdGenerator = () => '123'; //stub
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });

      //new object untuk menjlankan denagn segala dependenciesnya 
      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // await threadRepository.addThread(addThread);
      const thread = await threadRepository.getThread(params.threadId);


      //gunakan usertable dan buatkan class yang inigin di buat untuk pengecekan sesuai
      // Assert
      // const thread = await ThreadsTableTestHelper.findOwner('thread-123');
      expect(thread).toHaveLength(1);
    });
  });
});



