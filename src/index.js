const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cleanUrl = require('../src/helpers/cleanUrl');
const compression = require('compression');

//initialize
const app = express();
//require('../src/database/database');

//Set Config
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 'loopback');
var oneYear = 31557600000;
app.use(compression());
app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, cleanUrl(file.originalname))
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '20mb' }))
app.use(multer({ storage }).any());

// Routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});