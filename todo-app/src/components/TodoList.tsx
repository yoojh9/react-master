import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value);
    }
    console.log(toDos)

    return (
        <div>
            <h1>To dos</h1>
            <hr />
            <select onInput={onInput} value={category}>
                <option value="TO_DO">To Do</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>
            <CreateToDo />
            <hr />
            {
                toDos.map(todo => <ToDo key={todo.id} {...todo}></ToDo>)
            }

        </div>
    );
}

export default ToDoList;