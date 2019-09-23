/**
 * 统一数据
 * 使用mobx进行管理
 */
import { observable, action, computed } from 'mobx';

class Todo {
  id;
  @observable text = '';
  @observable completed = false;

  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

export class TodoListStore {
  index = 0;
  @observable activeTab = 0; //当前页签
  @observable todos = [];

  @computed get unfinishTodoNum() {
    return this.todos.filter((todo) => {
      return todo.completed !== true;
    }).length;
  }

  @computed get activeTodos() {
    if (this.activeTab === 1) {
      return this.todos.filter((todo) => {
        return todo.completed !== true;
      });
    } else if (this.activeTab === 2) {
      return this.todos.filter((todo) => {
        return todo.completed === true;
      })
    } else {
      return this.todos;
    }
  }

  @computed get selectedAll() {
    return this.todos.length > 0 && this.unfinishTodoNum === 0;
  }

  @computed get showSelectedAll() {
    return this.todos.length > 0;
  }

  @computed get showClearCompleted(){
    return this.unfinishTodoNum < this.todos.length;
  }

  @action
  switchTab = (num) => {
    this.activeTab = num;
  }

  @action
  addTodo = (text) => {
    const todo = new Todo(this.index++, text);
    this.todos = [...this.todos,todo];
  }

  @action
  deleteTodo = (id) => {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    })
  }

  @action
  toggleTodo = (id) => {
    const todo = this.todos.find((todo) => {
      return todo.id === id;
    });
    todo.completed = !todo.completed;
  }

  @action
  toggleAllTodos = (completed) => {
    this.todos.forEach((todo) => {
      todo.completed = completed;
    });
  }

  @action
  clearCompletedTodos = () => {
    this.todos = this.todos.filter((todo) => {
      return todo.completed !== true;
    })
  }
}