# Todo-App  

Create-React-App을 타입스크립트로 시작하기

```
$ npx create-react-app my-app --template typescript
```

<br>

# 1. react-hook-form
react-hook-form을 사용하기 이전에는 아래와 같이 코드를 작성함

```TypeScript
// TodoList.tsx
import React, { useState } from "react";

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

export default ToDoList;
```

<br>

react-hook-form은 리액트에서 form으로 작업하기에 가장 좋은 방법이다. react-hook-form은 위의 작업을 한줄만으로 가능하게 해준다. form 유효성 체크도 하기 쉬움.


```
$ npm install react-hook-form
```

<br>

## 1) react-hook-form 사용하기

### (1) register()
 - {...register("toDo")} 이렇게 작성하면 register 함수가 반환하는 객체를 가져다가 input에 props로 전달할 수 있다.
 - register 객체는 { name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ} 값을 가지고 있고, 이미 onChange를 가지고 있으므로 onChange 이벤트를 따로 작성하지 않아도 된다.

```TypeScript
import { useForm } from "react-hook-form";

function ToDoList() {
    const { register } = useForm();
    console.log(register('toDo')); // { name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ}

    return <div>
      <form>
          <input {...register("email")} placeholder="Email"></input>
      </form>
    </div>
}
```

<br>

### (2) watch()
 - form의 입력값들의 변화를 관찰한다.

<br>

### (3) handleSubmit()
 - onSubmit() 이벤트를 대체한다.
 - 입력값들의 validation을 체크하고, 이벤트 preventDefault()도 담당한다.
 - handleSubmit() 함수는 두개의 인자를 받는다. valid할 때 처리할 함수와(onValid), valid 하지 않았을 경우 처리할 함수(onInvalid)를 인자로 갖는데, 이 때 onInvalid는 옵션값이다.
 - handleSubmit은 모든 validation을 끝마치고 데이터가 유효할 경우에만 onValid()를 호출한다

```TypeScript
function ToDoList() {
    const { register, watch, handleSubmit } = useForm();
    const onValid = (data: any) => {
        console.log(data);
    }

    return <div>
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register("email", { required: true })} placeholder="Email"></input>
            <input {...register("Password", { required: true, minLength: 5 })} placeholder="Password"></input>
            <button>Add</button>
        </form>
    </div>;
```

<br>

### (4) formState
 - 입력값이 유효하지 않을 경우 아래와 같이 어떤 종류의 에러인지 알려줌
 - 아래와 같이 message에 에러 메세지를 입력하면

 ```TypeScript
<input {...register("Password", { required: "Password is Required", minLength: { value: 5, message: "Your password is too short" }})} placeholder="Password"></input>

 ```

 - formState.error 객체에서 에러 메세지를 확인할 수 있음

 ```
 Password: {type: 'required', message: 'Password is Required', ref: input}
 Password: {type: 'minLength', message: 'Your password is too short', ref: input}
 ```
 
 <br>

완성된 코드는 아래와 같다.

```TypeScript
// TodoList.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
```

<br>

## 2) 정규식
- 정규식 테스트 사이트: https://www.regexpal.com/
- /^[A-Za-z0-9._%+-]+@naver.com$/
- 완성된 코드는 다음과 같다. https://github.com/yoojh9/react-master/blob/a7550c0d45ef9e9800e4dc5916d441cb8cd25512/todo-app/src/TodoList.tsx

<br>

## 3) custom validation
- react-hook-form의 setError는 특정한 에러를 발생시키게 해준다.

```TypeScript
const onValid = (data: IForm) => {
    console.log(data);
    if (data.password !== data.password1) {
        setError("password1", { message: "Password are not the same" })
    }
}
```

- 하지만 setError는 IForm에 있는 옵션만 나오므로 커스텀 에러를 지정하기 위해서는 IForm 인터페이스 항목을 하나 더 추가한다.

```TypeScript
interface IForm {
    email: string
    firstName: string
    lastName: string
    userName: string
    password: string
    password1: string
    extraError?: string
}

<span>{errors.extraError?.message}</span>
```

- input 태그에 validate를 직접 이용할 수도 있다.

```TypeScript
<input {...register("firstName", {
    required: "write here",
    validate: {
        noNico: (value) => value.includes("nico") ? "no nicos allowed" : true,
        noNick: (value) => value.includes("nick") ? "no nicks allowed" : true
    }
})}
```

- react-hook-form 완료: https://github.com/yoojh9/react-master/blob/3009cac3c8b605593cf903b8abd68d99147e8299/todo-app/src/TodoList.tsx

<br><br>


# 2. Recoil
- Recoil 사용: https://github.com/yoojh9/react-master/blob/b84ccca71e8a3b8d2925adc3052d93dafc0b7da5/todo-app/src/components/TodoList.tsx

- Refactoring: 

