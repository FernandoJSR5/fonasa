import { Meteor } from 'meteor/meteor';
import {Tasks} from "../imports/api/tasks";
import {Queries} from "../imports/api/queries";

Meteor.startup(() => {
    if (Queries.find().count() === 0) {
        const queries = [{
            'cantPatients': 0,
            'specialist': 'Gabriel Rodriguez',
            'query': 'Pediatria',
            'state' : 'desocupada'
        }, {
            'cantPatients': 0,
            'specialist': 'Ana Cares',
            'query': 'Urgencia',
            'state' : 'desocupada'
        }, {
            'cantPatients': 0,
            'specialist': 'Ivan Figueroa',
            'query': 'CGI',
            'state' : 'desocupada'
        }];

        queries.forEach((query) => {
            Queries.insert(query)
        });
    }
});