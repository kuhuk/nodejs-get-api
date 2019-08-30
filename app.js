import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/v1/todos', (req, res) => {
    console.log(req.body);
    if(!req.body.title) {
        return res.status(400).send({
            success : 'false',
            message : 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success : 'false',
            message : 'description is required'
        });
    }

    const todo = {
        id : db.length + 1,
        title : req.body.title,
        description : req.body.description
    }

    db.push(todo);

    return res.status(201).send({
        success : 'true',
        message : 'todo added successfully'
    })
});

// get all todos
app.get('/api/todos', (req, res) => {
    res.status(200).send({
        success : 'true',
        message : 'you have got the data successfully',
        todos : db
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`)
});