/**setelah dari addthreadUsecaseJS
 * ****************************************************************
 * require domain add dan added thread serta repository untuk hulu untuk menguhi testing
 * threadtabletesthelper untuk membantu validasi di database nanti ketika testing
 * buat dahulu tablehelper 
 */

const CommentThread = require("../../../Domains/threads/entities/commentThread");
const CommentedThread = require("../../../Domains/threads/entities/commentedThread");
const pool = require('../../database/postgres/pool');
const CommentThreadRepositoryPostgres = require('../CommentThreadRepositoryPostgres');
const AuthenticationRepositoryPostgres = require('../AuthenticationRepositoryPostgres');

const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CommentThreadsTableTestHelper = require('../../../../tests/CommentThreadsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('ThreadRepository', () => {
  //wajib gunakan aftereach dan after all untuk testing 
  afterEach(async () => {
    await CommentThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });
  describe('added CommentThread successfully', () => {
    //mengcek validasi yang dikirimkan addthreadusecase bisa di masukan ke database dengan teting tabbble 

    it('should persist add Comment return commented thread correctly', async () => {
      // Arrange
      const addComment = new CommentThread({
        threadid: 'thread-123',
        content: 'content comment thread',
        owner: 'dicoding',
      });
      //menggunakan stub
      const fakeIdGenerator = () => '123'; //stub
      //new object untuk menjlankan denagn segala dependenciesnya 
      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, fakeIdGenerator);
      //gunakan object yang sudah ada depenciesnya gunakan await kalau sudah siap bisa diguankan 
      // Action
      await commentThreadRepositoryPostgres.commentThread(addComment);
      //gunakan usertable dan buatkan class yang inigin di buat untuk pengecekan sesuai
      // Assert
      const findcoment = await CommentThreadsTableTestHelper.findComment('comment-123');
      expect(findcoment).toHaveLength(1);

    });
    it('should return comment thread succesfull with validation addedcomment', async () => {
      // Arrange
      const addComment = new CommentThread({
        threadid: 'thread-123',
        content: 'content comment thread',
        owner: 'dicoding',
      });
      //menggunakan stub

      const fakeIdGenerator = () => '123'; // stub!

      //new object untuk menjlankan denagn segala dependenciesnya 
      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, fakeIdGenerator);


      // Action
      const commentedthread = await commentThreadRepositoryPostgres.commentThread(addComment);

      // Assert
      expect(commentedthread).toStrictEqual(new CommentedThread({
        id: 'comment-123',
        content: 'content comment thread',
        owner: 'dicoding',
      }));
    });

  });

  describe('findcoment function ', () => {
    it('should throw invariant errpr when threadid not available', async () => {
      await ThreadsTableTestHelper.addThread({ id: 'thread-12345' });

      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentThreadRepositoryPostgres.findThread('thread-1234567')).rejects.toThrowError(NotFoundError);
    });
    it('should not to throw invariant eror when threadid find', async () => {
      await ThreadsTableTestHelper.addThread({ id: 'thread-123456' });

      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, {});

      // Action
      const threadid = await commentThreadRepositoryPostgres.findThread('thread-123456');
      // Assert
      expect(threadid).toEqual({ id: 'thread-123456' });
    });
  })

  describe('GET DATA COMMENT', () => {
    it('should send data comment', async () => {
      const params = {
        threadId: 'thread-123'
      }

      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123', content: 'content comment thread3' });
      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-124', content: 'content comment thread2' });
      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, {});
      const comment = await commentThreadRepositoryPostgres.getComment(params.threadId);
      expect(comment).toHaveLength(2);

    });
  });

  describe('SOFT DELETE COMMENT', () => {
    it('should soft delete comment', async () => {
      // Arrange
      const params = {
        threadId: 'thread-123456789',
        commentId: 'comment-123456789',
      }

      const reqowner = {
        username: 'dicoding',
        id: 'user-123'
      }
      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool);

      // Action
      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123456789', threadid: 'thread-123456789' });


      // Assert
      const comments = await commentThreadRepositoryPostgres.deleteComment(params, reqowner);
      expect(comments).toStrictEqual('true');
    });

    it('should soft delete comment given not found when comment not found', async () => {

      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123456788' });

      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentThreadRepositoryPostgres.deleteComment('thread-12345677')).rejects.toThrowError(NotFoundError);
    });
  });

});



