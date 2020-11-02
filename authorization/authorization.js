const secret = process.env.JWT_SECRET
const expressJwt = require('express-jwt')
let userModule = require('../models').USERMODEL
let fillerModule = require('../models').FILLERMODEL
module.exports = authorize

function authorize(roles = []) {
	// roles param can be a single role string (e.g. Role.User or 'User')
	// or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
	if (typeof roles == 'string') {
		roles = [roles]
	}
	return [
		// authenticate JWT token and attach user to request object (req.user)
		expressJwt({ secret, algorithms: ['HS256'] }),

		// authorize based on user role
		(req, res, next) => {
			if (roles.length && !roles.includes(req.user.roles)) {
				// user's role is not authorized
				return res.status(401).json({ message: 'Unauthorized' })
			}
			switch (req.user.roles) {
			case 'User':
				userModule.findUserById(req.user.user_email)
					.then((user) => {
						if (user) {
							delete user.password
							req.user = user
							req.userType = 'User'
							// authentication and authorization successful
							next()
						} else {
							return res.status(404).json({ message: 'User Not Found' })
						}
					})
				break
				case 'Filler':
					fillerModule.findUserById(req.user.user_email)
						.then((user) => {
							if (user) {
								delete user.password
								req.user = user
								req.userType = 'Filler'
								// authentication and authorization successful
								next()
							} else {
								return res.status(404).json({ message: 'User Not Found' })
							}
						})
					break
			default:
				return res.status(404).json({ message: 'User Not Found' })
			}
		},
	]
}
