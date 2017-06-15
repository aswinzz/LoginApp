var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');





// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.post('/', function(req, res) {
    
      User.findOne({ email: req.body.email}, function(err, user) {
        

        bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(req.body.password, salt, function(err, hash) {
	        user.password = hash;
	        

        user.save(function(err) {
          req.logIn(user, function(err) {
          });
	    });
	});

        
        
        });
      });
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