const { User } = require('./model.js');
let jwt = require('jsonwebtoken');
let claveToken = process.env.TOKEN_KEY;
const bcrypt = require('bcrypt');

const generateToken = (user)=>{
    let newUser = {
        email: user.email,
		role: user.role,
    }
    return token = jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}

let getUsersByBody = async (req, res) =>{
    let query = {};
    let users = null;
    if (!!req.body.email) query.email = req.body.email;
	try{
		if(query.email !== undefined){
			users = await User.findOne(query);
		}
	} catch(e){
		console.log('Error: ', e);
	}
    return users;
};


exports.decodeToken = (token) =>{
    try {
        return jwt.verify(token, claveToken);
    } catch(e) {
        return null;
    }
}

const handlers = () => ({
	signUp: async (req, res) =>{
		try{
			let msg = 'User added.';
			let newUser = {name: req.body.name, pass: bcrypt.hashSync(req.body.pass, 6), email:req.body.email, role: req.body.role}
			const user = new User(newUser);
			await user.save();
			res.status(400).json({ msg }); 
			return true;
		} catch (e) {
			res.status(400).json({error: e})
			return false;
		}
	},
	login: async(req, res) =>{
		try{
			let { pass } = req.body;
			const usrLogin = await getUsersByBody(req, res);
			const isValid = bcrypt.compareSync(pass, usrLogin.pass, 6);
			if (usrLogin && isValid) {
				const token = generateToken(usrLogin);
				res.status(200).json({ 
					msg: 'Logged',
					token: token,
				});
				return true;
			} else{
				res.status(500).json({ error: 'Wrong user or password' });
				return false;
			}
		}catch(e) {
			res.status(400).json({error: e})
			return false;
		}
	},
	findAll: async (req, res) =>{
		let users = null;
		try{
			users = await User.find({})
			res.status(200).json({ users }); 
		} catch(e){
			console.log('Error: ', e);
			res.status(400)
		}
		return users;
	},
})

module.exports = handlers;