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

interface IForm {
    email: string
    firstName: string
    lastName: string
    userName: string
    password: string
    password1: string
}

function ToDoList() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    const onValid = (data: any) => {
        console.log(data);
    }
    console.log(register('email')); // { name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ}
    console.log(watch());
    // console.error(formState.errors)
    console.error(errors);
    return <div>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
            <input {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: "Only naver.com emails allowed"
                },
            })} placeholder="Email"></input>
            <span> {errors?.email?.message} </span>
            <input {...register("firstName", { required: "write here" })} placeholder="First Name"></input>
            <span> {errors?.firstName?.message} </span>
            <input {...register("lastName", { required: "write here" })} placeholder="Last Name"></input>
            <span> {errors?.lastName?.message} </span>
            <input {...register("userName", { required: "write here", minLength: 10 })} placeholder="Username"></input>
            <span> {errors?.userName?.message} </span>
            <input {...register("password", { required: "Password is Required", minLength: { value: 5, message: "Your password is too short" } })} placeholder="Password"></input>
            <span> {errors?.password?.message} </span>
            <input {...register("password1", { required: "write here", minLength: 5 })} placeholder="Password1"></input>
            <span> {errors?.password1?.message} </span>
            <button>Add</button>
        </form>
    </div>;
}

export default ToDoList;