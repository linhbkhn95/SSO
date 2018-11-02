/**
 * oauthBearer policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var passport = require('passport');

module.exports = function (scope) {
	sails.log.info('vao policyFactores', scope);
	return function (req, res, next) {
		sails.log.info('headers is req', req.headers);
		passport.authenticate(
			'bearer',
			function (err, user, info) {
				if ((err) || (!user)) {
					res.send(401);
					// res.redirect('/');
					return;
				}
				sails.log.info('oauthBearer:line 25 :', info.scope);

				delete req.query.access_token;
				req.user = user;
				req.scope = info;
				if (info.scope.indexOf(scope) > -1)
					return next();
				else {
					res.send(401);
				}
			}
		)(req, res);
	}
};
