import { Todo } from "./todo.class";


export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        // Recorre todos los valores del arreglo para filtrar todos los valores
        // diferentes al id, para formar un nuevo arreglo de tareas
        this.todos = this.todos.filter( todo => todo.id != id );

        this.guardarLocalStorage();

    }

    marcarCompletado( id ) {

        for( const todo of this.todos ){
            
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }

        }

    }

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem( 'todo', JSON.stringify(this.todos) );

    }

    cargarLocalStorage() {

        this.todos = ( localStorage.getItem('todo') ) 
                        ? JSON.parse( localStorage.getItem('todo') ) 
                        : [];

        // Version larga                        
        // this.todos = this.todos.map( obj => Todo.fromJson( obj ) )

        // version simplificada
        this.todos = this.todos.map( Todo.fromJson );
                        
    }
}