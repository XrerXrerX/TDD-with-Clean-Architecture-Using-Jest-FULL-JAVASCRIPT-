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
const InvariantError = require('../../../Commons/exceptions/InvariantError');


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


  describe('GET DATA THREAD', () => {
    it('should return data thread successfully', async () => {
      const params = {
        threadId: 'thread-123'
      }
      // //menggunakan stub
      // const fakeIdGenerator = () => '123'; //stub
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', created_at: '2024-02-24T15:25:51.326Z' });
      //new object untuk menjlankan denagn segala dependenciesnya 
      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // await threadRepository.addThread(addThread);
      const thread = await threadRepository.getThread(params.threadId);

      //gunakan usertable dan buatkan class yang inigin di buat untuk pengecekan sesuai
      // Assert
      // const thread = await ThreadsTableTestHelper.findOwner('thread-123');
      expect(thread).toHaveLength(1);
      expect(thread).toStrictEqual([{
        id: 'thread-123',
        title: 'Sample Thread',
        body: 'Sample Body',
        owner: 'dicoding',
        created_at: '2024-02-24T15:25:51.326Z',
        is_delete: null
      }]);
    });


    it('should send "Thread not found" error when thread does not exist', async () => {
      // Arrange
      const params = {
        threadId: 'thread-5465456456'
      }
      // const fakeIdGenerator = () => '123'; //stub
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      //new object untuk menjlankan denagn segala dependenciesnya 
      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // Action and assertion
      await expect(threadRepository.getThread(params)).rejects.toThrowError(InvariantError);
    });
  });
  describe('findcoment function ', () => {
    it('should throw invariant errpr when threadid not available', async () => {
      await ThreadsTableTestHelper.addThread({ id: 'thread-12345' });

      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepository.verifyThreadAvailability('thread-1234567')).rejects.toThrowError(NotFoundError);
    });
    it('should not to throw invariant eror when threadid find', async () => {
      await ThreadsTableTestHelper.addThread({ id: 'thread-123456' });

      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // Action
      const threadid = await threadRepository.verifyThreadAvailability('thread-123456');
      // Assert
      expect(threadid).toEqual({ id: 'thread-123456' });
    });
  })

  describe('check thread available without return anything', () => {
    it('should send "Thread not found" error when thread does not exist', async () => {
      // Arrange
      const params = {
        threadId: 'thread-5465456456'
      }
      // const fakeIdGenerator = () => '123'; //stub
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      //new object untuk menjlankan denagn segala dependenciesnya 
      const threadRepository = new ThreadRepositoryPostgres(pool, {});

      // Action and assertion
      await expect(threadRepository.CheckThread(params)).rejects.toThrowError(NotFoundError);
    });
  });
});
