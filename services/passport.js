const passport 			= require('passport');
const GoogleStrategy 	= require('passport-google-oauth20').Strategy;
const mongoose			= require('mongoose');
const keys				= require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	return done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true //trust heroku proxy
		}, 
		async (accessToken, refreshToken, profile, done) => {

			const existingUser = await User.findOne({googleId: profile.id});

			if(existingUser) {

				//we already have a record with the given profile id
				return done(null, existingUser); //first argument is error object, pass null if no error

			} else {

				const user = await new User({googleId: profile.id}).save();
				return done(null, user);

			}
		}
	)
); 