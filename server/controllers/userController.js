const {User, create, read, readId, update, destroy, signIn} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
	static getUser(req, res){
		read(users=>{
			if (users) {
				res.status(200).json({
					message: 'Users summoned',
					data: users,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static getUserId(req,res){
		readId(req.params.id, (user)=>{
			if (user) {
				res.status(200).json({
					message: 'Users summoned',
					data: user,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured'
				})
			}
		})
	}
	static signIn(req, res){
		signIn(req.body.username, (user)=>{
			if (user.length == 0) {
				res.status(403).json({
					message: 'User not found',
				})
			}
			if (bcrypt.compareSync(req.body.password, user[0].password)) {
				let payload = {
					userId: user[0]._id,
					username : user[0].username,
					fullname : user[0].fullname,
					phone : user[0].phone,
				}
				jwt.sign(payload, process.env.SECRET_KEY, (error, token)=>{
					if (error) {
						res.status(403).json({message: 'User and password wrong', error: error})
					} else {
						req.headers.token = token;
						res.status(200).json({
							message: 'User signed in successfully',
							data: token,
							userId : user[0]._id
						})
					}
				})
			}
		})
	}
	static createUser(req,res){
		let data = {
			username: req.body.username,
			fullname: req.body.fullname,
			phone: req.body.contact,
			password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
		}
		create(data, (error, data)=>{
			if (!error) {
				res.status(200).json({
					message: 'Users created',
					data: data,
				})
			}
			else {
				res.status(400).json({
					message: 'Error occured',
					error: error
				})
			}
		})
	}
	static updateUser(req,res){
		readId(req.params.id, (user)=>{
			let data = {
				username: req.body.username || user[0].username,
				password: req.body.password || user[0].password,
			}
			update(req.params.id, data, (error)=>{
				if (!error) {
					res.status(200).json({
						message: 'Users updated',
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
	static deleteUser(req,res){
		destroy(req.params.id, (error)=>{
			if (!error) {
				res.status(200).json({
					message: 'Users delete'
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

module.exports = UserController;