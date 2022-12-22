
const initModels = require("../models/init-models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');
const db = require("../models/index");
const models = initModels(db.sequelize);

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {message: 'Please enter email and password.'});
        }
        const results = await models.bus_user.findOne({where: {email: email}}) /*|| await models.bus_user.findOne({ where : {mail : email} })*/

        if (!results || await !(bcrypt.compare(password, results.password)) ) {
            return res.status(401).render('login', {message: 'Incorrect email or password.'})
        }


            const id = results.id;
            const token = jwt.sign({id}, 'MySecretKey', {
                expiresIn: '90d'
            });
            console.log("The token is " + token);
            const cookieOptions = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60),
                httpOnly: true
            }
            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect('/');

    } catch (error) {
        console.log(error);
    }
}

exports.register = (req, res) => {
    console.log(req.body);
    const { username,  email, nom, prenom,  num,  role, cin , adresse ,  password, re_password} = req.body;
    const results = models.bus_user.findAll({where: { email: email}})

    console.log("le nombre de resultat  ", results.length);
    if (results.length > 0) {
        return res.render('register', {message: 'Email already exists.'});
    } else if (password !== re_password) {
        return res.render('register', {message: 'Password mismatch.'});
    }else   {
        const hashedPassword = bcrypt.hashSync(password, 8);
        console.log(hashedPassword);
        models.bus_user.create({
            user_name: username ,
            email : email,
            nom :nom ,
            prenom :prenom,
            num : num,
            role : role,
            cin : cin ,
            adresse : adresse ,
            password : hashedPassword

        }).then((results,error) => {
            if (error) {
                console.log("error :",error);
            } else {
                console.log(results);
                return res.render('register', {message: 'User registered.'});
            }
        })
    }
}


exports.register_client = (req, res) => {
    console.log(req.body);
    const { username,  email, nom, prenom,  num,  cin , adresse ,  password, re_password} = req.body;
    const results = models.bus_user.findAll({where: { email: email}})

    console.log("le nombre de resultat  ", results.length);
    if (results.length > 0) {
        return res.render('register', {message: 'Email already exists.'});
    } else if (password !== re_password) {
        return res.render('register', {message: 'Password mismatch.'});
    }else   {
        const hashedPassword = bcrypt.hashSync(password, 8);
        console.log(hashedPassword);
        models.bus_user.create({
            user_name: username ,
            email : email,
            nom :nom ,
            prenom :prenom,
            num : num,
            role : 7 ,
            cin : cin ,
            adresse : adresse ,
            password : hashedPassword

        }).then((results,error) => {
            if (error) {
                console.log("error :",error);
            } else {
                console.log(results);
                return res.render('register', {message: 'User registered.'});
            }
        })
    }



}



exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, 'MySecretKey');
            console.log(decoded);
            //Check if the user still exists
            const result = await models.bus_user.findOne({where:{id:decoded.id}})


            console.log("msg",result);
            if (!result) {
                return next();
            }
            req.user = result;
            return next();

        } catch (error) {
            console.log("error",error);
        }
    } else {
        next();
    }
}

exports.logout = async (req, res) => {
    // res.cookie('jwt', req.cookies.jwt, {
    //     expires: new Date(Date.now() + 2 * 1000),
    //     httpOnly: true
    // });
    res.clearCookie('jwt');
    res.status(200).redirect('/');
}

