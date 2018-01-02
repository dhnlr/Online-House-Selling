const {House, create, read, readId, readSel, readName, readLoc, update, destroy} = require('../models/houseModel');

class HouseController {
	static getHouse(req, res){
		read(houses=>{
			if (houses) {
				res.status(200).json({
					message: 'Houses summoned',
					data: houses,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getHouseId(req,res){
		readId(req.params.id, (house)=>{
			if (house) {
				res.status(200).json({
					message: 'Houses summoned',
					data: house,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getHouseSel(req,res){
		readSel(req.params.seller, (house)=>{
			if (house) {
				res.status(200).json({
					message: 'Houses summoned',
					data: house,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getHouseName(req,res){
		readName(req.query.q, (house)=>{
			if (house) {
				res.status(200).json({
					message: 'Houses summoned',
					data: house,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getHouseLoc(req,res){
		readLoc(req.query.q, (house)=>{
			if (house) {
				res.status(200).json({
					message: 'Houses summoned',
					data: house,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static createHouse(req,res){
		let data = {
			name: req.body.name,
			description: req.body.description,
			location: req.body.location,
			image: req.file.cloudStoragePublicUrl,
			price: req.body.price,
			bedroom: req.body.bedroom,
			bathroom: req.body.bathroom,
			kitchen: req.body.kitchen,
			seller: req.body.seller
		}
		create(data, (error, data)=>{
			if (!error) {
				res.status(200).json({
					message: 'Houses created',
					data: data,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured',
					data: error
				})
			}
		})
	}
	static updateHouse(req,res){
		readId(req.params.id, (house)=>{
			let data = {
				name: req.body.name || house[0].name,
				description: req.body.description || house[0].description,
				location: req.body.location || house[0].location,
				image: req.file.cloudStoragePublicUrl || house[0].image,
				price: req.body.price || house[0].price,
				bedroom: req.body.bedroom || house[0].bedroom,
				kitchen: req.body.kitchen || house[0].kitchen,
				bathroom: req.body.bathroom || house[0].bathroom,
			}
			update(req.params.id, data, (error)=>{
				if (!error) {
					res.status(200).json({
						message: 'Houses updated',
						data: data,
					})
				}
				else {
					res.status(400).json({
						message: 'Error occured',
						data: error
					})
				}
			})
		})
	}
	static deleteHouse(req,res){
		destroy(req.params.id, (error)=>{
			if (!error) {
				res.status(200).json({
					message: 'Houses delete'
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured',
					data: error
				})
			}
		})
	}
}

module.exports = HouseController;