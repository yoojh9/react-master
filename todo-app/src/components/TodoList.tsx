import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
    toDo: string;
}

interface IToDo {
    text: string;
    id: number,
    category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState)
    //const value = useRecoilValue(toDoState);
    //const modFn = useSetRecoilState(toDoState);

    const {
        register,
        handleSubmit,
        setValue
    } = useForm()
    const handleValid = (data: IForm) => {
        console.log('add to do', data.toDo);
        setToDos(oldToDos => [{ text: data.toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos])
        setValue("toDo", "");
    }
    console.log(toDos)

    return (
        <div>
            <h1>To dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required: "please write a To Do",
                })} placeholder="Write a to do"></input>
                <button>Add</button>
            </form>
            <ul>{toDos.map(toDo =>
                <li key={toDo.id}>{toDo.text}</li>)}
            </ul>
        </div>
    );
}

export default ToDoList;