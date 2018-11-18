const functions = require('firebase-functions');
//include library expressjs setelah install di folder functions : npm i --save firebase-functions
const express = require('express');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


//inisialisasi apps expressjs
const app = express();

//set template engine ke ejs setelah install di folder functions : npm install ejs -save
app.set('view engine', 'ejs');
//set folder static ke public untuk menyimpan file statis
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
  res.render("index");
});



app.get('/chat_menu', function(req,res) {
  res.render("chat_menu");
});

app.get('/chat_personal', function(req,res) {
  res.render("chat_personal");
});

app.get('/chat_public', function(req,res) {
  res.render("chat_publicl");
});

app.get('/chat_select', function(req,res) {
  res.render("chat_select");
});

app.get('/news', function(req,res) {
  res.render("news");
});

app.get('/news_input', function(req,res) {
  res.render("news_input");
});

app.get('/report_input', function(req,res) {
  res.render("report_input");
});

app.get('/report', function(req,res) {
  res.render("report");
});

app.get('/login', function(req,res) {
  res.render("login");
});


exports.apps = functions.https.onRequest(app);

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
