//importing 
import mongoose from 'mongoose';
import express from 'express';
import Messages from './Schema/dbMsg.js';
import 'dotenv/config';
import Pusher from "pusher";

// app config
const app = express();
const port = process.env.PORT || 9000;


const pusher = new Pusher({
  appId: "1629618",
  key: "99184aadb6e95ee75def",
  secret: "e3bc1fce03a44dcb52e1",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

//middleware
app.use(express.json());

//DB config

const url = 'mongodb+srv://rajvinder4131:' + process.env.MONGO + '@clone.j5wo9ep.mongodb.net/clonedb?retryWrites=true&w=majority'; //connection string to atlas

//connection function that uses mongoose to connect to the atlas
mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongo");
    });

//??

//api routes


app.get('/',(req,res)=>{res.status(200).send('heyy')});

app.post('/messages/new',(req,res)=>{
    const dbMsg = req.body;
    Messages.create(dbMsg);

});

app.get('/messages/sync',
    async( req , res)=>{
     const msg = await Messages.find();
    console.log(msg)}
)


//listen
app.listen(port, () => {
    console.log(`listening ${port}`)
})






// import mongoose, { connect } from 'mongoose'


// mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
// const con = mongoose.connection
// con.on('open', function () {
//     console.log("finally iti mehnat k baad ");
// })