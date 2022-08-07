const notes = require('express').Router();
const fs = require('fs');

notes.get('/',(req,res) => {
    res.json(`${req.method} request received to get r`)
})