const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json')
// const api = require('./routes/index')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static('public'));


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req,res) => res.sendFile(path.join(__dirname, "/db/db.json")));

app.post('/api/notes', (req,res) => {

  const {title, text} = req.body;

  if(title && text){
    const newNote = {title, text}
    
  

    fs.readFile("./db/db.json", 'utf-8', (err,data) => {
      if(err){
        console.log(err)
      } else {
        const notes = JSON.parse(data)
        const notesLength = notes.length.toString();
        newNote.id = notesLength
        notes.push(newNote)
      
    
      fs.writeFile('./db/db.json',JSON.stringify(notes,null,4),
      (writeErr) => writeErr ? console.log(writeErr) : console.log('Note Added Succesfully'))
      res.sendFile(path.join(__dirname, "/db/db.json"))
  }})
  };
  

})

app.delete('/api/notes/:id', (req,res) => {
  const deleteId = req.params.id
  
  fs.readFile("./db/db.json", 'utf-8', (err,data) => {
    const notes = JSON.parse(data);
    for(let i=0; i < notes.length; i++){
      if(deleteId === notes[i].id){
        notes.splice(i,1)
        fs.writeFile('./db/db.json',JSON.stringify(notes,null,4),
        (writeErr) => writeErr ? console.log(writeErr) : console.log('Note succesfully deleted'))
        res.sendFile(path.join(__dirname, "/db/db.json"))
      }
    }

  })
})


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
