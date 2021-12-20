import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const { register, handleSubmit, setValue } = useForm();
    const setToDos = useSetRecoilState(toDoState);

    const handleValid = (data: IForm) => {
        console.log('add to do', data.toDo);
        setToDos(oldToDos => [{ text: data.toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos])
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
