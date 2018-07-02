import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//import '../imports/ui/scheduler/scheduler.js';
import '../imports/ui/scheduler/login.js'
import '../imports/ui/scheduler/register.js'
import '../imports/ui/scheduler/dashboard.js'
import './main.html';

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });