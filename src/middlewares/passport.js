import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(options, async (payload, done) => {

        try {

            return done(null, payload);

        } catch (error) {

            return done(error, false);

        }

    })
);

export default passport;