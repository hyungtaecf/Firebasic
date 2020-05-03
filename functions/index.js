const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
// admin.initializeApp(process.env.FIREBASE_CONFIG);
admin.initializeApp(functions.firebaseConfig());
exports.sendMessage = functions.firestore
    .document('products/{productId}')
    .onCreate((snap, context) => {
        const docId = context.params.productId;
        const value = snap.data();
        const name = value.name;
        const productRef = admin.firestore().collection('products').doc(docId)
        return productRef.update({ message: `Nice ${name}! - Love Cloud Functions` })
    })