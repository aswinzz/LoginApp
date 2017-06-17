var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');





// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	
	User.find(function(err, docs){
    res.render('index', {users: docs });	
  });
});

router.post('/', function(req, res) {
    
      User.findOne({ email: req.body.email}, function(err, user) {
        var oldpic = user.pic;
        user.pic = req.body.pic;
        if(!user.pic){
        	user.pic=oldpic;
        }
        if(req.body.password){
        bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(req.body.password, salt, function(err, hash) {
	        user.password = hash;
	        

        user.save(function(err) {
          req.logIn(user, function(err) {
          });
	    });
	});

        
        
        });
    }
      });
      req.flash('success_msg', 'Profile Details Successfully changed');
      res.redirect('/')
    
  
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;