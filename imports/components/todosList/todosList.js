import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';
import { Queries} from "../../api/queries";
import template from './todosList.html';

class TodosListCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        this.hideCompleted = false;
        this.helpers({
            tasks() {
                const selector = {};

                if (this.getReactively('hideCompleted')) {
                    selector.checked = {
                        $ne: true
                    };
                }
                return Tasks.find(selector, {
                    sort: {
                        priority: -1
                    }
                });
            },
            incompleteCount() {
                return Tasks.find({
                    checked: {
                        $ne: true
                    }
                }).count();
            }
        })
    }

    addTask(newTask) {
        const age = newTask.age
        if (age <= 15) {
            if(age <= 5) newTask.priority = newTask.relation + 3
            else if (age => 6 && age <= 12) newTask.priority = newTask.relation + 2
            else newTask.priority = newTask.relation + 1
            newTask.query = newTask.priority <= 4 ? 'Pediatria' : 'Urgencia'
            Tasks.insert({
                name: newTask.name,
                age: newTask.age,
                numHistory: Math.floor(Math.random() * 1000) + 1,
                type: 'kid',
                relation: newTask.relation,
                priority: newTask.priority,
                query: newTask.query,
                createdAt: new Date
            });

            // Clear form
            this.newTask.name = '';
            this.newTask.age = 0;
            this.newTask.relation = 1;
        }
        else if(age > 15 && age <= 40) {
            if (newTask.smoker) {
                newTask.priority = newTask.ageSmoker / 4 + 2
                newTask.query = newTask.priority > 4 ? 'Urgencia' : 'CGI'
                Tasks.insert({
                    name: newTask.name,
                    age: newTask.age,
                    numHistory: Math.floor(Math.random() * 1000) + 1,
                    type: 'joung',
                    smoker: newTask.smoker,
                    ageSmoker: newTask.ageSmoker,
                    priority: newTask.priority,
                    query: newTask.query,
                    createdAt: new Date
                });

                // Clear form
                this.newTask.name = '';
                this.newTask.age = 0;
                this.newTask.smoker = '';
                this.newTask.ageSmoker = 0;
            }
            else {
                newTask.priority = 2
                Tasks.insert({
                    name: newTask.name,
                    age: newTask.age,
                    numHistory: Math.floor(Math.random() * 1000) + 1,
                    type: 'joung',
                    smoker: false,
                    priority: newTask.priority,
                    query: 'CGI',
                    createdAt: new Date
                });

                // Clear form
                this.newTask.name = '';
                this.newTask.age = 0;
            }
        }
        else if (age >= 60 && newTask.diet){
            newTask.priority = age / 20 + 4
            newTask.query = newTask.priority > 4 ? 'Urgencia' : 'CGI'
            Tasks.insert({
                name: newTask.name,
                age: newTask.age,
                numHistory: Math.floor(Math.random() * 1000) + 1,
                type: 'old',
                diet: true,
                priority: newTask.priority,
                query: newTask.query,
                createdAt: new Date
            });
            // Clear form
            this.newTask.name = '';
            this.newTask.age = 0;
            this.newTask.diet = '';
        }
        else {
            newTask.priority = age / 30 + 3
            newTask.query = newTask.priority > 4 ? 'Urgencia' : 'CGI'
            Tasks.insert({
                name: newTask.name,
                age: newTask.age,
                numHistory: Math.floor(Math.random() * 1000) + 1,
                type: 'old',
                diet: newTask.diet,
                priority: newTask.priority,
                query: newTask.query,
                createdAt: new Date
            });
            // Clear form
            this.newTask.name = '';
            this.newTask.age = 0;
            this.newTask.diet = '';
        }
    }

    setChecked(task) {
        // Set the checked property to the opposite of its current value
        Tasks.update(task._id, {
            $set: {
                checked: !task.checked
            },
        });
    }

    removeTask(task) {
        Tasks.remove(task._id);
    }
}

export default angular.module('todosList', [
    angularMeteor
])
    .component('todosList', {
        templateUrl: 'imports/components/todosList/todosList.html',
        controller: ['$scope', TodosListCtrl]
    });