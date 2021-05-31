import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import ITodo from '../models/ITodo';

const wait = (time: number): Promise<ITodo> => {
    return new Promise<ITodo>((res, rej) => {
      setTimeout(() => {
        res({
            id: 1,
            title: "Gabi",
            complete: true
          });
      }, time);
    });
};

interface EditParams {
    todoId?: string | undefined;
}

const Edit: React.FC  = () => {

    const history = useHistory();

    const { todoId } = useParams<EditParams>();

    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('');

    const [todo, setTodo] = useState<ITodo>({
        id: 0,
        title: "",
        complete: false
      });

    useEffect(() => {
        getTodo();
    }, []);

    const getTodo = async () => {
        setIsLoading(true);
        const todoRetrieved: ITodo = await wait(1000);
        setTitle(todoRetrieved.title);
        setTodo(todoRetrieved);
        setIsLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            title: e.currentTarget.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleSaveChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('input', todo);
        //request to the app
        fetch('http://localhost:8000/api/todo-list/')
            .then(response => response.json())
            .then(data => console.log(data))//history.push('/')
            .catch(error => console.log(error));
    }

    const handleCancelChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h3>Editing Task "{title}"</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" name="title" placeholder={title} value={todo.title} onChange={handleInputChange}/>
                        </div>
                        <button type="submit" onClick={handleSaveChanges}>Save</button><button onClick={handleCancelChanges}>Cancel</button>
                    </form>
                    
                </>
            )
            }
        </> 
    );
}

export default Edit;