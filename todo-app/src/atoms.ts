import { atom, selector } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);   // get()을 통해 state를 가져올 수 있음
        return [
            toDos.filter(todo => todo.category === "TO_DO"),
            toDos.filter(todo => todo.category === "DOING"),
            toDos.filter(todo => todo.category === "DONE")
        ]
    }
})