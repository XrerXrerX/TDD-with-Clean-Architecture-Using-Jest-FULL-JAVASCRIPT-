/** menjalankann testing addthradusecase dan menjadi usecase berjalan
 * 
 * tampilkan addthread domain untuk parameter agar tidak keluar jalur
 * execute parameter sesuai dengan test yang dikirimkan 
 * usecase yang dipakai harus sesuai dengan thjread
 * usecase yang dikirimkan sesuai dengan prosdes test yang berlagngsung 
 * akan melemparkan ke repository 
  */
const AddThread = require('../../Domains/threads/entities/addthread');

class AddThreadUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(threadPayload, owner) {

        threadPayload.owner = owner;

        const addThread = new AddThread(threadPayload);
        return this._threadRepository.addThread(addThread);
    }
}

module.exports = AddThreadUseCase;