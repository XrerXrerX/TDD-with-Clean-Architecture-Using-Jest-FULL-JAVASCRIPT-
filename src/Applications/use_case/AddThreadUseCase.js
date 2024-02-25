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
    constructor({ threadRepository, authenticationTokenManager }) {
        this._threadRepository = threadRepository;
        this._authenticationTokenManager = authenticationTokenManager;
    }

    async execute(threadPayload, owneruser) {
        // console.log(id == 'undefined');
        // if (!id || id == undefined || id == null || id == '') {
        //     throw new AuthenticationError('ADDEDTHREAD.NOT_HAVE_NEEDED_AUTHNENTICATION_OWNER');
        // }
        const owner = await this._authenticationTokenManager.decodePayload(owneruser);
        threadPayload.owner = owner.username;
        const addThread = new AddThread(threadPayload);
        return this._threadRepository.addThread(addThread);
    }
}

module.exports = AddThreadUseCase;