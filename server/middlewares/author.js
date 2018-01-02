const {House, create, read, readId, readSel, readName, readLoc, update, destroy} = require('../models/houseModel.js')

module.exports = (req, res, next) =>{
	readSel(req.decoded.userId, (houses)=>{
		if (req.decoded && houses) {
			next()
		}
		else {
			res.status(403).json({
				message: 'User not authorize'
			})
		}
	})
	
}