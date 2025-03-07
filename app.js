const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));

app.use(session({
  secret: 'tokopudidi',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true }
}));

app.use('/', require('./routers'));

app.listen(port, () => {
  console.log(`Tokopudidi running on port ${port}`)
});