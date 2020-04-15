import { Todo } from "../classes";

import { todoList } from '../index';



// Referencias en HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' } >
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    // Se crea un contenedor Div
    const div = document.createElement('div');
    // Insertamos html con el li
    div.innerHTML = htmlTodo;

    // Lo agregamos al index html en la clase .todo-list el primer elemento hijo del div
    // Que es la lista desordenada
    divTodoList.append( div.firstElementChild );

    // retornamos el div
    return div.firstElementChild;

}

// Eventos

//Keyup = es la tecla que presiona
//KeyCode: es el codigo de la tecla presionada
txtInput.addEventListener('keyup', ( event ) =>{

    if( event.keyCode === 13 && txtInput.value.length > 0 ){

        console.log(txtInput.value);
        const nuevoTodo  = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );

        txtInput.value = '';

    }
    
});


// Evento para marcar y desmarcar tarea como completada
divTodoList.addEventListener('click', ( event ) => {

    // Esto captura  el lugar donde se  da click pudiendo ser un
    // Input, label o boton que son los elemento que estan dentro del divTodoList
    const nombreElemento = event.target.localName; 

    //Referencia para capturar el li
    const todoElemento = event.target.parentElement.parentElement;
    //Obtener el id de la tarea
    const todoId = todoElemento.getAttribute('data-id');

    // Hizo click en el check-completado
    if( nombreElemento.includes('input') ){

        todoList.marcarCompletado( todoId );
        // Agregar tachado a la tarea
        todoElemento.classList.toggle('completed');

    }else if( nombreElemento.includes('button') ){
        
        // Esta parte es para eliminar el elemento
        todoList.eliminarTodo( todoId );
        //Eliminar del Html el li con la tarea
        divTodoList.removeChild( todoElemento ); 
    }

});

// Evento para borrar todas las tareas completadas
btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    //Eliminar tareas de HTML de abajo hacia arriba
    for( let i = divTodoList.children.length-1;  i >= 0; i-- ){

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }

    }

});


ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ) { return };

    anchorFiltros.forEach(elem => elem.classList.remove('selected') );
    
    event.target.classList.add('selected');


    for( const elemento of divTodoList.children ) {
        
        elemento.classList.remove('hidden');    
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
            
        }
    }

});