const functions = require('firebase-functions');
const createUser = require('./create-user');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.goodbye = functions.https.onRequest((req, res) => {
  res.json({ message: 'Goodbye!' });
});

exports.createUser = functions.https.onRequest(createUser);
