import './login.html'

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if(error){
                alert("Username or password is incorrect.");
            }
        });
        console.log("Form submitted.");
    }
});