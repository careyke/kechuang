/**
 * 利用mobx构造可观测的数据
 */
import { observable, action, computed, autorun } from 'mobx';

let index = 0;

class Todo {
    @observable text = '';
    @observable completed = false;
    constructor(text) {
        this.id = index++;
        this.text = text;
    }
    @action.bound toggle() {
        this.completed = !this.completed;
    }
}

class Store {
    @observable todolist = [];

    constructor(){
        this.oldtodolist = this.todolist;
        autorun(()=>{
            console.log('oldtodolist',this.oldtodolist);
            console.log('todolist',this.todolist);
        })
    }

    @action.bound addTodo(text) {
        this.todolist = [...this.todolist,new Todo(text)];
        // this.todolist.unshift(new Todo(text));
    }

    @action.bound deleteTodo(id) {
        this.todolist = this.todolist.filter((todo) => {
            return todo.id !== id;
        })
    }

    @action.bound deleteCompletedTodos() {
        this.todolist = this.todolist.filter(todo => !todo.completed);
    }

    @action.bound toggleAllTodos(selected) {
        this.todolist.forEach((todo) => {
            todo.completed = selected;
        })
    }

    @computed get leftTodos() {
        return this.todolist.filter((todo) => !todo.completed).length || 0;
    }

    @computed get selectedAll() {
        let noAll = this.todolist.some((todo) => !todo.completed);
        return !noAll;
    }
}

const store = new Store();
export default store;

