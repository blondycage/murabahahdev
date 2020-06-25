const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
const { auth } = require('firebase');
admin.initializeApp(functions.config().firebase);
var db = admin.database();

const user = userid => this.db.ref(`users/${userid}`);
var status = '';
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.createplan = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'wrong request method',
      });
    }

    // Attach an asynchronous callback to read the data at our posts reference
  user(req.body.uid).on(
      'value',
      (snapshot) => {
        authuser = snapshot.val();
        status = authuser.status;
        if (authuser && status === 'BLOCKED')
          return res.status(200).json({
            message: `SORRY ${authUser.username} but you can not apply for this plan at this moment visit our frequently asked page to know more`,
          });
        if (authuser && status === 'APPROVED') {
          if (authuser.spendlimit) {
            if (Number(authuser.spendlimit) < Number(req.body.amount)) {
              return res.status(200).json({
                message: `SORRY ${auth.username} but you can not apply for this plan at this moment please  try a lesser transaction`,
              });
            }
          }
        }

      }
      
      ,
      (errorObject) => {
        console.log('The read failed: ' + errorObject.code);
        return res.status(500).json({
          message: errorObject.code,
        });
      }
    );
  });
});
