import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
    toDo: string;
}

function ToDoList() {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm()
    const handleValid = (data: IForm) => {
        console.log('add to do', data.toDo);
        setValue("toDo", "");
    }
    return <div>
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "please write a To Do",

            })} placeholder="Write a to do"></input>
            <button>Add</button>
        </form>
    </div>;
}

export default ToDoList;