import { atom, selector } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

export const categoryState = atom({
    key: "category",
    default: "TO_DO"
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);   // get()을 통해 state를 가져올 수 있음
        const category = get(categoryState);
        console.log('category: ', category)
        return toDos.filter(todo => todo.category === category)
    }
})