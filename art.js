const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const port = 8080;

//step 2: add a static file handler for resources in the static folder
/*
const server = http.createServer(function(req, res) {
    fs.readFile('static/tester.html', function(error, data) {
        if(error) {
            res.writeHead(404)
            res.write('error: file not found')
        }
        else {
            res.write(data)
        }
        res.end()
    })
})
*/

//step 3: creat a provider module for json file
const jsonPath = path.join(__dirname, 'paintings.json')

fs.readFile(jsonPath, (error, data) => {
    if(error) {
        console.log('unable to read json data file')
    }
    else {
        paintings = JSON.parse(data)
    }
})


//step 4: adding 'get()' route handlers
app.get('/', (req, res) => {
    res.json(paintings)
})

app.get('/:id', (req, res) => {
    const paintingID = req.params.id;
    const matches = paintings.filter(obj => paintingID == obj.paintingID)
    res.json(matches);
})

app.get('/gallery/:id', (req, res) => {
    const galleryID = req.params.id;
    const matches = paintings.filter(obj => galleryID == obj.gallery.galleryID)
    res.json(matches);
})

app.get('/artist/:id', (req, res) => {
    const artistID = req.params.id;
    const matches = paintings.filter(obj => artistID == obj.artist.artistID)
    res.json(matches);
})

app.get('/year/:min/:max', (req, res) => {
    const { min, max } = req.params;
    const minYear = parseInt(min, 10);
    const maxYear = parseInt(max, 10);

    const filteredPainting = paintings.filter(obj => {return obj.yearOfWork >= minYear && obj.yearOfWork <= maxYear})
    res.json(filteredPainting);
})



//calls server
app.listen(port, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    }
    else {
        console.log('Sever is listening on port= ' + port)
    }
})