/**UJI SEMUA TESTING
 * ********************************
 * require semua kebutuhan dan addedthread wajib untuk validasi dan juga threadreposotory domain wajib
 * setelah addthread lanjut ke error translator > daftar ke createserver > buat handler dll
 * 
 */

const InvariantError = require('../../Commons/exceptions/InvariantError');

const AddedThread = require('../../Domains/threads/entities/addedthread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
// const generateThreadId = require('../../Applications/utils/idGenerator');

/** di container sudah require semua threadrepository domain dan
 *  juga depencenciesnya di dalam container
 * ****************************************************************
 * pastikan sudah require di repository dan jua usecase wajib 
 * sesuaikan depencensi di constructor apa saja yang akan di pakai  
*/

class ThreadRepositoryPostgres extends ThreadRepository {

    // super digunakan untuk memanggil konstruktor dari kelas induk.
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    //dikirimkan dari usecase addtherad
    async addThread(addThread) {

        const { title, body, owner } = addThread;
        //dari container dan dependecies
        const id = `thread-${this._idGenerator()}`;
        const created_at = new Date().toISOString();

        const query = {
            text: 'INSERT INTO threads (id, title, body, owner ,created_at) VALUES($1, $2, $3 , $4 ,$5) RETURNING id, title, body , owner',
            values: [id, title, body, owner, created_at],
        };


        const result = await this._pool.query(query);
        //mengirimkan sesuai dengand omain yang diharapkan 
        return new AddedThread({
            ...result.rows[0]
        });
    }

    async getThread(threadId) {
        const threadidquery = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [threadId],
        };
        const threaddata = await this._pool.query(threadidquery);
        if (threaddata.rowCount == 0) {
            throw new InvariantError('Thread not found');
        }
        return threaddata.rows;
    }
};



module.exports = ThreadRepositoryPostgres;
