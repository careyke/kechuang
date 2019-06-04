/**
 * action creators
 */
import { Action } from "./type";

export function addTodo(text: string): Action {
  return {
    type: "addTodo",
    text: text
  };
}

export function deleteTodo(id: number): Action {
  return {
    type: "deleteTodo",
    id: id
  };
}

export function toggleTodo(id: number, selected: boolean): Action {
  return {
    type: "toggleTodo",
    id: id,
    completed: selected
  };
}

export function toggleAllTodos(selected: boolean): Action {
  return {
    type: "toggleAllTodos",
    completed: selected
  };
}

export function clearCompleteTodos(): Action {
  return {
    type: "clearCompleteTodos"
  };
}

export function sort(): Action {
  return {
    type: "sort"
  };
}

export function modifyId(oid: number, nid: number): Action {
  return {
    type: "modifyId",
    oid,
    nid
  };
}
