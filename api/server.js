// BUILD YOUR SERVER HERE
const express = require('express');
const model = require('./users/model');
const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    model.find()
        .then(users => {
            res.status(200).json(users);
        }).catch(() => {
            res.status(500).json({message: "The users information could not be retrieved"});
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    model.findById(id)
        .then(user => {
            if(user){
                res.status(200).json(user);
            }else{
                res.status(404).json({message: "The user with the specific ID does not exist"});
            }
        }).catch(() => {
            res.status(500).json({message: "The user information could not be retrieved"});
        })

})

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    if(name && bio){
        model.insert(req.body)
            .then(user => {
                res.status(201).json(user);
            }).catch(() => {
                res.status(500).json({message: "There was an error while saving the user to the database"});
            })
    }else{
        res.status(400).json({message: "Please provide name and bio for the user"});
    }
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const {name, bio} = req.body;
    if(name && bio){
        model.update(id, req.body)
            .then(user => {
                if(user){
                    res.status(201).json(user);
                }else{
                    res.status(404).json({message: "The user with the specific ID does not exist"});
                }
            }).catch(() => {
                res.status(500).json({message: "The user information could not be modified"});
            })
    }else{
        res.status(400).json({message: "Please provide name and bio for the user"});
    }
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    model.remove(id)
        .then(user => {
            if(user){
                res.status(200).json(user)
            }else{
                res.status(404).json({message: "The user with the specific ID does"})
            }
        }).catch(() => {
            res.status(500).json({message: "The user could not be removed"});
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
