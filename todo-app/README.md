# Todo-App

Create-React-App을 타입스크립트로 시작하기

```
$ npx create-react-app my-app --template typescript
```

<br>

## 1. react-hook-form
react-hook-form을 사용하기 이전에는 아래와 같이 코드를 작성함

```
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

### 1) react-hook-form 사용하기

#### (1) register()
- {...register("toDo")} 이렇게 작성하면 register 함수가 반환하는 객체를 가져다가 input에 props로 전달할 수 있다.
- register 객체는 { name: 'toDo', onChange: ƒ, onBlur: ƒ, ref: ƒ} 값을 가지고 있고, 이미 onChange를 가지고 있으므로 onChange 이벤트를 따로 작성하지 않아도 된다.

#### (2) watch()
- form의 입력값들의 변화를 관찰한다.


```
// TodoList.tsx

import { useForm } from "react-hook-form";

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


```



