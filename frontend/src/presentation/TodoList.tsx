import React, { useState, useRef, useEffect } from 'react';
import './TodoList.css';
import ITodo from '../models/ITodo';

const TodoList: React.FC  = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const [todoList, setTodoList] = useState<ITodo[]>([]);

    const description = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        setIsLoading(true);
        fetch('http://localhost:8000/api/todo-list/')
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                console.log(data);
                setTodoList(data);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });
    };

    const addTodoApi = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if(description.current && description.current.value) {
            setIsLoading(true);
            const newTodo: ITodo= {
                id: todoList.length,
                title: description.current.value,
                complete: false
            };
            fetch('http://localhost:8000/api/todo-create/', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(newTodo)
            })
            .then(response => response.json())
            .then(data => {
                todoList.push(data);
                setTodoList(todoList);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });  
        }  
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const foundTodo = todoList.find(element => element.id === id)
        if(foundTodo) {
            const updatedTodo = {
                ...foundTodo,
                complete: !foundTodo.complete
            }
            fetch(`http://localhost:8000/api/todo-update/${id}/`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(updatedTodo)
                })
                .then(response => response.json())
                .then(data => {
                    const newTodoList = todoList.map((todo: ITodo) => {
                        if(todo.id === id){
                            return data;
                        }
                        return todo;
                    });
                    setTodoList(newTodoList);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log(error);
                });  
            /*const newTodoList = todoList.map((todo: ITodo) => {
                if(todo.id === id){
                    const newTodo = {
                        ...todo,
                        completed: !todo.completed
                    }
                    return newTodo;
                }
                return todo;
            });
            setTodoList(newTodoList);*/
        }  
    }

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h3>To-Do List</h3>
                    <ul className="TodoList">
                        {
                            todoList
                                ? todoList.map((task: ITodo) => (
                                    <li key={task.id} className="TodoList-task">
                                        <input className="TodoList-task_check" type="checkbox" id="cbox1" checked={task.complete} onChange={(e) => {
                                            handleCheckboxChange(e, task.id);
                                        }}></input>
                                        <label className="TodoList-task_description"> {task.title}</label>
                                        <a className="TodoList-task_edit" href={`edit/${task.id}`}>Edit</a>
                                    </li>
                                ))
                                : null
                        }
                        
                    </ul>
                    <div>
                        <input type="text" ref={description}></input><button onClick={addTodoApi}>Add</button>
                    </div>
                </>
            )
            }
        </> 
    );
}

export default TodoList;