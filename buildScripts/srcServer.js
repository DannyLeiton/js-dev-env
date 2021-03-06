import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', (req, res) => {
	// Hard coding for simplicity. Pretend this hits a real database
	res.json([
		{"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com"},
		{"id": 2, "firstName": "Danny", "lastName": "Leiton", "email": "dleitonrivera@gmail.com"},
		{"id": 3, "firstName": "Pablo", "lastName":"Leiton", "email": "pableiton@hotmail.com"}
	]);
});

// To generate fake data: https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html
/* json-schema-faker.js.org
{
  "type": "array",
  "items": [
    {
    "type": "integer"
    },
    {
    "type": "boolean"
    },
    {
    "type": "string"
    }
  ]
}

{
  "type": "array",
  "minItems": 100,
  "maxItems": 200,
  "items":
    {
    "type": "integer"
    }
}
*/

app.listen(port, function(err) {
	if(err) {
		console.log(err);
	} else {
		open('http://localhost:' + port);
	}
});
