import React, { useState } from "react";
import { useForm } from "react-hook-form";

// react-hook-form 쓰기 전
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
    const { register, watch, handleSubmit, formState } = useForm();
    const onValid = (data: any) => {
        console.log(data);
    }
    console.log(register('toDo')); // { name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ}
    console.log(watch());
    console.error(formState.errors);
    return <div>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
            <input {...register("email", { required: true })} placeholder="Email"></input>
            <input {...register("firttName", { required: true })} placeholder="First Name"></input>
            <input {...register("last Name", { required: true })} placeholder="Last Name"></input>
            <input {...register("username", { required: true, minLength: 10 })} placeholder="Username"></input>
            <input {...register("Password", { required: "Password is Required", minLength: { value: 5, message: "Your password is too short" } })} placeholder="Password"></input>
            <input {...register("Password1", { required: true, minLength: 5 })} placeholder="Password1"></input>
            <button>Add</button>
        </form>
    </div>;
}

export default ToDoList;