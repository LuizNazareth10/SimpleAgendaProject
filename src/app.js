import express from 'express';
import bodyParser from 'body-parser';
import { render } from 'ejs';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

//public folder
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

import indexRouter from '../routes/index.js';
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});