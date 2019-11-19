const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

const jwtSecret = process.env.SESSION_SECRET;

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require("../src/models/User").User;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'name',
      emailField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.find()
      .or([{ name: req.body.name }, { email: req.body.email }])
      .exec((err, items) => {
        if (err) return done(err);
        if (items.length > 0) {
          return done(null, false, { message: 'user exists' });
        } else {
          return done(null, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: null
          });
        }
      })
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      email: 'email',
      password: 'password',
      session: false,
    },
    (email, password, done) => {
      User.findOne()
      .where({ email: email })
      .exec((err, item) => {
        if (err) return done(err);
        if (item === null) return done(null, false, { message: 'no user found' });

        bcrypt.compare(password, user.password).then(response => {
          if (response !== true) {
            console.log('passwords do not match');
            return done(null, false, { message: 'passwords do not match' });
          }
          console.log('user found & authenticated');
          // note the return needed with passport local - remove this return for passport JWT
          return done(null, user);
        });
      });
    }),
);

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret,
};

passport.use(
  'jwt',
  new JWTstrategy(jwtOptions, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          username: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);