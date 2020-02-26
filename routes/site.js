// Что пишет сервер на своих страницах браузера
const passport = require('passport');
const login = require('connect-ensure-login');

module.exports.index = (request, response) =>
  response.send('knopkadom.ru OAuth 2.0 Server');

module.exports.loginForm = (request, response) => response.render('login');

module.exports.login = passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
});

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect('/');
};

module.exports.account = [
  login.ensureLoggedIn(),
  (request, response) => response.render('account', { user: request.user }),
];
