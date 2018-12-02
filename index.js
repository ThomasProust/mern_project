const express 		= require('express');
const mongoose 		= require('mongoose');
const cookieSession = require('cookie-session');
const passport 		= require('passport');
const bodyParser    = require('body-parser');
const keys 			= require('./config/keys');

require('./models/User');
require('./services/passport'); //does not return anything

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
//Middlewares
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
		keys: [keys.cookieKey] //use to encrypt data in cookie
	})
);
// tell passport to use cookie
app.use(passport.initialize());
app.use(passport.session());

//Routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);