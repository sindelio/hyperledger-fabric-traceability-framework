const jsonwebtoken = require('jsonwebtoken');
const { 
	NotFound,
	BadRequest,
} = require('../error-handling/errors');

class jwtService {

	getSecret(userType) {
		let secret;
		switch(userType){
			case 'ASSET':
				secret = process.env.ASSET_SECRET;
				break
			default:
				throw new NotFound('User type not found');
		}
		return secret;
	}
	
	sign(payload, userType){
		const secret = this.getSecret(userType);
		const options = {
			algorithm: 'HS256',
			expiresIn: '24h',
		};
		const jwt = jsonwebtoken.sign(payload, secret, options);
		return jwt;
	}

	// The functions bellow are Express middleware

	verificationMiddlewareFactory(userType){
		const secret = this.getSecret(userType);
		const verificationMiddleware = function(req, res, next){
			let userInfo = null;
			try {
				if(!req.headers.authorization) throw new BadRequest('Missing JWT');
				const jwt = req.headers.authorization.split(' ')[1]; // 'Bearer $TOKEN', we just need the token part
				userInfo = jsonwebtoken.verify(jwt, secret);
			} catch (e) {
				next(e);
				return null;
			}
			req.user = userInfo;
			// console.log('req.user: ', req.user);
			next();
		}
		return verificationMiddleware;
	}
};

module.exports = jwtService;