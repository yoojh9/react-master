import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const { register, handleSubmit, setValue } = useForm();
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);

    const handleValid = (data: IForm) => {
        console.log('add to do', data.toDo);
        setToDos(oldToDos => [{ text: data.toDo, id: Date.now(), category }, ...oldToDos])
        setValue("toDo", "");
    }

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "please write a To Do",
            })} placeholder="Write a to do"></input>
            <button>Add</button>
        </form>
    )
}

export default CreateToDo;
