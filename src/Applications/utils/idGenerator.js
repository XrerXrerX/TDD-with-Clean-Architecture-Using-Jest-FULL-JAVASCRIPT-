
// // src/utils/idGenerator.js
// const crypto = require('crypto');

// // function generateThreadId() {
// //     // Implement your logic to generate a unique thread ID
// //     // You can use a library like uuid or any other method that suits your needs
// //     const buffer = crypto.randomBytes(8); // 8 bytes for a 64-bit ID
// //     return buffer.toString('hex');
// // }

// function generateThreadId(baseString) {
//     // Implement your logic to generate a unique ID
//     // You can use a library like uuid or any other method that suits your needs
//     const buffer = crypto.randomBytes(8); // 8 bytes for a 64-bit ID
//     const randomId = buffer.toString('hex');
//     return `${baseString}-${randomId}`;
// }


// module.exports = generateThreadId;