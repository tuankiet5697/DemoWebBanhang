const express = require('express')
const path = require('path');
handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const route = require('./routes');
const db = require('./config/db');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

db.connect();

const app = express();
const port = 3000;
 
const store = new MongoDBSession({
  uri: 'mongodb://localhost:27017/VuaKhoaiNamTinh',
  collection: 'MySession',
});

app.use(session({
  secret: 'work hard',
  resave: false,
  saveUninitialized: false,
  store: store,
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(methodOverride('_method'));

app.engine('hbs', 
handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a,b) => a+ b,
}
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

route(app);
app.listen(port, () =>{
  console.log(`App listening at http://localhost:${port}`)
});