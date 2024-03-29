const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connecting Database
connectDB();

//Body Parser
app.use(express.json({extended: false}))

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

//Server static asset in production
if(process.env.NODE_ENV === 'production'){
    //Set Static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`);
})