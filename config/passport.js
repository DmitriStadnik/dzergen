import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

const localStrategy = require('passport-local').Strategy;
const User = require("../src/models/User").User;
// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = function(passport, key) {

  passport.use(
    'register',
    new localStrategy(
      {
        name: 'name',
        email: 'email',
        password: 'password',
        session: false,
      },
      (email, password, done) => {
        User.find()
          .or([{ name: name }, { email: email }])
          .exec((err, items) => {
            if (err) return done(err);
            if (items.length > 0) {
              return done(null, false, { message: 'user exists' });
            } else {
              bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                const user = new User({
                  name: username,
                  email,
                  password: hashedPassword,
                  image: null
                });

                user.save(function (err) {
                  if (err) return console.error(err);
                  return done(null, user);
                  // note the return needed with passport local - remove this return for passport JWT to work
                });
              });
            }
          });
      },
    ),
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


  // jwt stuff

  // const opts = {
  //   jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  //   secretOrKey: key,
  // };

  // passport.use(
  //   'jwt',
  //   new JWTstrategy(opts, (jwt_payload, done) => {
  //     try {
  //       User.findOne({
  //         where: {
  //           username: jwt_payload.id,
  //         },
  //       }).then(user => {
  //         if (user) {
  //           console.log('user found in db in passport');
  //           // note the return removed with passport JWT - add this return for passport local
  //           done(null, user);
  //         } else {
  //           console.log('user not found in db');
  //           done(null, false);
  //         }
  //       });
  //     } catch (err) {
  //       done(err);
  //     }
  //   }),
  // );
};