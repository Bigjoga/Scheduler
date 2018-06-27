Template.register.events({
    "submit .form-signup": function(event){

        var email = trimInput(event.target.email.value);
        var password = trimInput(event.target.password.value);
        var password2 = trimInput(event.target.password2.value);

        if(isNotEmpty(email) &&
            isNotEmpty(password) &&
            isNotEmpty(password2) &&
            isEmail(email) &&
            areValidPasswords(password, password2)){

                Account.createUser({
                    email: email,
                    password: password
                }, function(err){
                    if (err) {
                        FlashMessages.sendError('There was an error with registration');
                    } else {
                        FlashMessages.sendSuccess('Account Created! You are now logged in');
                        
                    }
                })
            }
    }
});

var trimInput = function(val) {
	return val.replace(/^\s*|s*$/g, "");
}

//Check for empty fields
isNotEmpty = function(value) {
	if (value && value !== '') {
		return true;
	}
	FlashMessages.sendError("Please fill in all the fields");
	return false;
};

//Validate Email
isEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(value)) {
		return true;
	}
	FlashMessages.sendError("Please use a valid email address");
	return false;
};

//Check password field
isValidPassword = function(password) {
	if (password.length < 6) {
		FlashMessages.sendError("Password must be at least 6 characters");
		return false;
	}
	return true;
};

//Match Password
areValidPasswords = function(password, confirm) {
	if (!isValidPassword(password)) {
		return false;
	}
	if (password !== confirm) {
		FlashMessages.sendError("Passwords do not match");
		return false;
	}
	return true;
};