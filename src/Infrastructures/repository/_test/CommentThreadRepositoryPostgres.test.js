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
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
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



  describe('GET DATA COMMENT', () => {
    it('should send data comment', async () => {
      const params = {
        threadId: 'thread-123'
      }

      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123', content: 'content comment thread3', created_at: '2024-02-25T13:01:49.242Z', });
      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-124', content: 'content comment thread2', created_at: '2024-02-25T13:01:49.242Z', });
      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, {});
      const comment = await commentThreadRepositoryPostgres.getComment(params.threadId);
      expect(comment).toHaveLength(2);
      expect(comment).toStrictEqual(
        [{
          id: 'comment-123',
          threadid: 'thread-123',
          content: 'content comment thread3',
          owner: 'dicoding',
          created_at: '2024-02-25T13:01:49.242Z',
          is_delete: null
        },
        {
          id: 'comment-124',
          threadid: 'thread-123',
          content: 'content comment thread2',
          owner: 'dicoding',
          created_at: '2024-02-25T13:01:49.242Z',
          is_delete: null
        }]);
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
      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123456789', threadid: 'thread-123456789', created_at: '2024-02-25T13:01:49.242Z' });
      await commentThreadRepositoryPostgres.getComment(params.threadId);
      const comment = await commentThreadRepositoryPostgres.deleteComment(params, reqowner);
      // Assert
      expect(comment.is_delete).toStrictEqual('true');
      expect(comment).toStrictEqual(
        {
          id: 'comment-123456789',
          threadid: 'thread-123456789',
          content: 'content comment thread',
          owner: 'dicoding',
          created_at: '2024-02-25T13:01:49.242Z',
          is_delete: 'true'
        }
      );
    });


    it('should soft delete comment given not found when comment not found', async () => {

      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123456788' });

      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentThreadRepositoryPostgres.deleteComment('thread-12345677')).rejects.toThrowError(NotFoundError);
    });
  });

  describe('VERIFY DELETE COMMENT', () => {
    it('should verify delete soft delete with authentication ', async () => {
      // Arrange
      const params = {
        threadId: 'thread-123456789',
        commentId: 'comment-123456789',
      }
      const reqowner = 'dicoding';

      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool);
      // Action
      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123456789', threadid: 'thread-123456789', owner: 'dicoding' });
      const found = await commentThreadRepositoryPostgres.CheckComment(params.commentId);

      const veryfy = await commentThreadRepositoryPostgres.VerifyDeleteComment(params, reqowner);
      expect(veryfy).toStrictEqual('comment allowed for delete');
      expect(found).toStrictEqual('comment found');
    });

    it('should verify delete soft delete with authentication send authorization error', async () => {
      // Arrange
      const params = {
        threadId: 'thread-123456789',
        commentId: 'comment-1233456789',
      }
      const reqowner = {
        username: 'johndoe',
        id: 'user-123'
      }
      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool);
      // Action
      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-1233456789', threadid: 'thread-123456789', owner: 'dicoding' });
      await expect(commentThreadRepositoryPostgres.VerifyDeleteComment(params, reqowner)).rejects.toThrowError(AuthorizationError);
    });

    it('should verify delete soft delete with authentication send authorization error', async () => {
      // Arrange

      const commentId = 'comment-1233456789';

      const commentThreadRepositoryPostgres = new CommentThreadRepositoryPostgres(pool);
      // Action
      await CommentThreadsTableTestHelper.commentThread({ id: 'comment-123345678954', threadid: 'thread-123456789', owner: 'dicoding' });
      await expect(commentThreadRepositoryPostgres.CheckComment(commentId)).rejects.toThrowError(NotFoundError);
    });



  });

});



