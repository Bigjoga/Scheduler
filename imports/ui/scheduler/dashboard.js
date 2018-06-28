import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './dashboard.html'
import './scheduler.js'


Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});