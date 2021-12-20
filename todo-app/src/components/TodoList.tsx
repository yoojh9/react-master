import { useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const [toDos, doing, done] = useRecoilValue(toDoSelector);

    return (
        <div>
            <h1>To dos</h1>
            <hr />
            <CreateToDo />
            <h2>To Do</h2>
            <ul>{toDos.map(toDo =>
                <ToDo key={toDo.id} {...toDo} />
            )}
            </ul>
            <hr />
            <h2>Doing</h2>
            <ul>{doing.map(toDo =>
                <ToDo key={toDo.id} {...toDo} />
            )}
            </ul>
            <hr />
            <h2>Done</h2>
            <ul>{done.map(toDo =>
                <ToDo key={toDo.id} {...toDo} />
            )}
            </ul>
            <hr />
        </div>
    );
}

export default ToDoList;