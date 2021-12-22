# Recoil-Test

## 1. Recoil Selector
state를 가져와서 state를 수정하고 output을 내보낼 때는 Selector를 사용함.

```TypeScript
// atoms.ts
import { atom, selector } from "recoil";

export const minuteState = atom({
    key: "minutes",
    default: 0
})

export const hourSelector = selector({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
});
```

<br><br>


### 1) get()
- get()을 통해 atom으로 지정한 state 값을 가져올 수 있음

<br>

### 2) set()
- atom을 수정하게 해 줌
- state를 set() 할 수 있음

```TypeScript
import { atom, selector } from "recoil";

export const minuteState = atom({
    key: "minutes",
    default: 0
})

export const hourSelector = selector<number>({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
    set: ({ set }, newValue) => {
        const minutes = Number(newValue) * 60;
        set(minuteState, minutes);
    }
});
```

<br><br>

#### ※ string -> number 형 변환

```TypeScript
+"1"    // number 1
```

