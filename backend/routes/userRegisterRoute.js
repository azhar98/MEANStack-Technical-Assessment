const bcrypt = require('bcrypt');
const express = require('express');
const { body, validationResult } = require('express-validator');
const UserRegister = require('../models/UserRegister');
const jwt = require('jsonwebtoken');
router = express.Router();
var saltRounds=8;

router.post('/useregister', [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6 })
  ], (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
     console.log(req.body)
     console.log('rr', hash)
  
    UserRegister.create({
      email: req.body.email,
      password: hash
    }).then(user => res.json({
        msg:'user register successfully',
        user
    }));
  });


  //user login
  router.post('/userlogin',(req, res)=> {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
      console.log(req.body)

    UserRegister.findOne({'email':req.body.email}).then(result=>{
        console.log(result)
        
              var logintoken = jwt.sign({foo: 'bar'}, result.email, {expiresIn:'2h'})
            bcrypt.compare(req.body.password, result.password,(err, data)=> {
                   console.log(logintoken) 
                if(err) return err;
                res.json(
                    logintoken
                )
            });
        
    }).catch(error => console.log(error))

   
     
    
  });

  module.exports = router;