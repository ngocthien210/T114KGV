const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// db connect config
const db = require('./config/dbkey').mongoURI;
mongoose.connect(db, {useNewUrlParser: true}).then(function(){
    console.log('success');
}).catch(err =>console.log(err));



app.get('/',function(req,res){
    res.send('Hello world')
});
// use routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


const port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log('server run port 3000');
});
