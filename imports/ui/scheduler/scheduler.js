import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.js';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_minical';

import './scheduler.html';

import {Events} from '../../api/events.js';

show_minical = function(){

    if (scheduler.isCalendarVisible()){
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position:"dhx_minical_icon",
            date:scheduler._date,
            navigation:true,
            handler:function(date,calendar){
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar()
            }
        });
    }
}

Template.scheduler.onRendered(function () {
    
    let container = this.$(".dhx_cal_container")[0];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;
    scheduler.init(container, new Date(today), "month");

    let parseEventData = (data)=> {
        let event = {};

        for (let property in data) {
            if (property == "_id") {
                event["id"] = data[property];
            }
            else {
                event[property] = data[property];
            }
        }

        return event;
    };

    let serializeEvent = (event) => {
        let data = {};

        for (let property in event) {
            if (property.charAt(0) == "_" || property == "id") continue;

            data[property] = event[property];
        }

        return data;
    };

    let eventsCursor = Events.find();
    let events = [];
    let renderTimeout = null;

    eventsCursor.observe({
        added(data) {
            let event = parseEventData(data);
            if (!scheduler.getEvent(event.id)) {
                events.push(event);
            }

            clearTimeout(renderTimeout);
            renderTimeout = setTimeout(()=> {
                scheduler.parse(events, "json");
                events = [];
            }, 5);
        },

        changed(data) {
            let event = parseEventData(data);
            let originalEvent = scheduler.getEvent(event.id);

            if (!originalEvent) return;

            for (let key in event) {
                originalEvent[key] = event[key];
            }

            scheduler.updateView();
        },

        removed(data){
            let event = parseEventData(data);
            if (scheduler.getEvent(event.id)) {
                scheduler.deleteEvent(event.id);
            }
        }
    });

    scheduler.attachEvent("onEventAdded", (eventId, event) => {
        let data = serializeEvent(event);
        let newId = Events.insert(data);
        scheduler.changeEventId(eventId, newId);
    });

    scheduler.attachEvent("onEventChanged", (eventId, event) => {
        let data = serializeEvent(event);
        Events.update(eventId, {$set: data});
    });

    scheduler.attachEvent("onEventDeleted", (eventId) => {
        Events.remove(eventId);
    });
    
});