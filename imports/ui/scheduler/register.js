import './register.html'

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
		var passwordVar = event.target.registerPassword.value;
		
		Accounts.createUser({
			email: emailVar,
			password: passwordVar
		});
        alert("Your account has been created!");
        console.log("Form submitted.");
    }
});
