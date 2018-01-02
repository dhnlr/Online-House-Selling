const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const Schema = mongoose.Schema;


const HouseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: 'https://cdn.shopify.com/s/files/1/0013/5042/products/Redstoneshop-24_large.jpg'
	},
	price: {
		type: Number,
		required: true
	},
	bedroom: {
		type: Number,
		required: true
	},
	bathroom: {
		type: Number,
		required: true
	},
	kitchen: {
		type: Number,
		required: true
	},
	seller: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

const House = mongoose.model('House', HouseSchema);

const create = (data, callback) => {
	House.create(data, (error, data)=>{
		if (!error) callback(null, data)
		else {
			callback(error, null)
		}
	})
}

const read = (callback) =>{
	House.find().populate('seller').exec().then( houses=>{
		callback(houses)
	})	
}

const readId = (id, callback) => {
	House.find({'_id': ObjectId(id)}).populate('seller').exec().then( house=>{
			callback(house)
	})
}

const readSel = (seller, callback) => {
	House.find({'seller': ObjectId(seller)}).populate('seller').exec().then( house=>{
			callback(house)
	})
}

const readName = (name, callback) => {
	House.find({'name': name}).populate('seller').exec().then( house=>{
			callback(house)
	})
}

const readLoc = (location, callback) => {
	House.find({'location': location}).populate('seller').exec().then( house=>{
			callback(house)
	})
}

const update = (id, data, callback) => {
	House.findOneAndUpdate({'_id': ObjectId(id)}, {$set: data}, {upsert: true, new : true},(error, data)=>{
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

const destroy = (id, callback) => {
	House.remove({'_id': ObjectId(id)}, (error) => {
		if (!error) {
			callback(null)
		}
		else {
			callback(error)
		}
	})
}

module.exports = {House, create, read, readId, readSel, readName, readLoc, update, destroy};