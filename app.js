//outside modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

//entities
import Post from './db/posts.js';

//routers
import routes from './routes/routes.js';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

mongoose.connect('mongodb://localhost:27017/NewCoderForum', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("Server currently listening on port " + port);
        app.listen(port);
    });

