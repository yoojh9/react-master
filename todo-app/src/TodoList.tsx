import React, { useState } from "react";
import { useForm } from "react-hook-form";

/*
function ToDoList() {
    const [toDo, setToDo] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setToDo(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(toDo);
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input value={toDo} onChange={onChange} placeholder="Write a to do"></input>
            <button>Add</button>
        </form>
    </div>;
}
*/

function ToDoList() {
    const { register, watch } = useForm();
    console.log(register('toDo')); // { name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ}
    console.log(watch());

    return <div>
        <form>
            <input {...register("email")} placeholder="Email"></input>
            <input {...register("firttName")} placeholder="First Name"></input>
            <input {...register("last Name")} placeholder="Last Name"></input>
            <input {...register("username")} placeholder="Username"></input>
            <input {...register("Password")} placeholder="Password"></input>
            <input {...register("Password1")} placeholder="Password1"></input>
            <button>Add</button>
        </form>
    </div>;
}

export default ToDoList;