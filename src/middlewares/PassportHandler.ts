import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import { User } from '../models/User';
import { JWT_SECRET } from '../utils/Secrets';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ username: username.toLowerCase() }, (err: Error, user: any) => {
        if (err) return done(err);
        if (!user) {
            return done(undefined, false, { message: `username ${username} not found` });
        }

        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) return done(err);

            if (isMatch) return done(undefined, user);
            return done(undefined, false, { message: `Invalid username or password` });
        });
    });
}));


passport.use(new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET }, function (jwtToken, done) {
    User.findOne({ username: jwtToken.username }, function (err: Error, user: any) {
        if (err) { return done(err, false); }
        if (user) {
            return done(undefined, user, jwtToken);
        } else {
            return done(undefined, false);
        }
    });
}));

