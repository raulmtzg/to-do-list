
import './styles.css';

// si no se especifica nombre busca por defecto el archivo index.js
import { Todo, TodoList } from './classes'; 

import { crearTodoHtml } from './js/componentes';

// Crear un nuevo arreglo de tareas vacio
export const todoList = new TodoList();

// Crear los html con las tareas existentes
todoList.todos.forEach( crearTodoHtml );

console.log('todos', todoList.todos);
