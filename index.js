const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();


// Init middleware
app.use(logger);
/* app.get('/', (req, res) => {
    //res.send('<h1>Hello World</h1>');
    //res.sendFile(path.join(__dirnme, 'public', 'index.html'));  loads HTML file
}); */


//Gets all members
app.get('/api/members', (req, res) => {
    res.json(members);
})

//Get Single Member
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `No member with the ID of ${req.params.id}`});
    }
});

//Set static folder (prob wont do this)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));