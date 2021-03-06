import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export type DeleteTodolistAT = {
    type: "DELETE-TODOLIST"
    id: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
let initState: TodolistType[] = []

type ActionsType = AddTodolistAT | DeleteTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT
export const todolistsReducer = (state = initState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case "DELETE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const removeTodolistAC = (id: string): DeleteTodolistAT => {
    return {type: "DELETE-TODOLIST", id}
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    let todolistId = v1()
    return {type: "ADD-TODOLIST", title, todolistId}
}
