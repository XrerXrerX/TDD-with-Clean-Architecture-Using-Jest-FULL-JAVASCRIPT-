const InvariantError = require('./InvariantError');
const NotFoundError = require('./NotFoundError');
const AuthenticationError = require('./AuthenticationError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),


  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),


  'THREAD.NO_HAVE_GOOD_PAYLOAD': new InvariantError('bad payload inserted'),
  'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('bad payload not meet data type'),
  'ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_ID_ADDEDTHREAD': new InvariantError('title not found in addedthread'),
  'ADDEDTHREAD.NOT_HAVE_NEEDED_PROPERTY_TITLE_ADDEDTHREAD': new AuthenticationError('body not found in addedthread'),
  'ADDEDTHREAD.NOT_HAVE_NEEDED_AUTHNENTICATION_OWNER': new AuthenticationError('Missing authentication'),
  'THREAD.NO_HAVE_OWNER_FOR_AUTHENTICATION_IN_ADDTHREAD': new AuthenticationError('Missing authentication'),


  'COMMMENTTHREAD.NOT_CONTAIN_THREADID_PROPERT': new InvariantError('Thread must have thread for comment'),
  'COMMMENTTHREAD.NOT_CONTAIN_CONTENT_PROPERTY': new InvariantError('Input Content is a must'),
  'COMMMENTTHREAD.NOT_CONTAIN_NEEDED_AUTHENTICATION': new AuthenticationError('Missing authentication'),
  'COMMENTTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Type data tidak sesuai'),
  'COMMENTTHREAD.CONTENT_LIMIT_CHAR': new AuthenticationError('CONTENT tidak boleh lebih dari 50 character'),


  'COMENTEDTHREAD.NOT_HAVE_ID_FOR_FIND_THREAD': new AuthenticationError('cannot find thread cause threadid notfound'),
  'COMENTEDTHREAD.NOT_HAVE_OWNER_FOR_AUTHENTICATION': new AuthenticationError('Missing authentication'),
  'COMENTEDTHREAD.NOT_HAVE_CONTENT_FOR_FIND_THREAD': new AuthenticationError('bad payload in added coment cause no content inserted'),
  'COMENTEDTHREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Type data tidak sesuai'),


  'DELETE_AUTHENTICATION_USE_CASE.NOT_HAVE_AUTHENTICATION': new AuthenticationError('Missing authentication'),

};

module.exports = DomainErrorTranslator;
