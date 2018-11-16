const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.newUser = functions.auth.user().onCreate((user) => {
  return admin.database().ref("/users/" + user.uid).set({
    email : user.email,
    alamat : '',
    no_hp : '',
    facebook : '',
    line : '',
    instagram : '',
    whatsapp : '',
    roles : 'member'
  });

});


exports.deleteUser = functions.auth.user().onDelete((user) => {
  return admin.database().ref("/users/" + user.uid).remove();
});
