const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-chuck-norris-joke', function (req, res) {

    let movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    let reqUrl = encodeURI('https://api.chucknorris.io/jokes/random');
    https.get(reqUrl, (responseFromAPI) => {
		responseFromAPI.on('data', function (chunk) {
            let data = JSON.parse(chunk)['value'];
            // let dataToSend = movieToSearch === 'The Godfather' ? 'I don\'t have the required info on that. Here\'s some info on \'The Godfather\' instead.\n' : '';
            // dataToSend += movie.name + ' is a ' + movie.stars + ' starer ' + movie.genre + ' movie, released in ' + movie.year + '. It was directed by ' + movie.director;

            return res.json({
            speech: data,
            displayText: data,
            source: 'get-movie-details'
        });

        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-movie-details'
        });
    });
});
server.listen((process.env.PORT|| 8000),function(){
	console.log("server is up and running")
})