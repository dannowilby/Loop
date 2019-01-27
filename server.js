const dev = 'development';
const port = 3000;

/* app */
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const e_app = express();
const n_app = next({ dev });
const n_handler = n_app.getRequestHandler();

e_app.use(bodyParser.json());
e_app.use(bodyParser.urlencoded({ extended: true }));
e_app.use(cookieParser());

/* static folders */
e_app.use(express.static('static'));

/* database */
const { database } = require('./database/database');
const { User, Item } = require('./database/models');

/* authentication */
const passport = require('passport');
require('./routes/passport');
const auth = require('./routes/auth');

e_app.use('/auth', auth);
// e_app.use('/api', passport.authenticate('jwt', { session: false }), user);

const items = require('./routes/items');
e_app.use('/item', items);

const upload = require('./routes/upload.js');
e_app.use('/api', passport.authenticate('jwt', { session: false }), upload);

e_app.get('*', n_handler);

User.sync({  }).then(() => {});

Item.sync({ force: true }).then(() => {});

database.sync().then(() => {
  n_app.prepare().then(() => {
    e_app.listen(port, () => {

      console.log('listening...');
    });
  });
});
