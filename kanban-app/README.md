# Kanban App

<br>

# 1. react-beautiful-dnd: drag and drop
- react-beautiful-dnd 라이브러리 사용
- https://www.npmjs.com/package/react-beautiful-dnd
- https://github.com/atlassian/react-beautiful-dnd

```
$ npm i react-beautiful-dnd
$ npm i --save-dev @types/react-beautiful-dnd
```

### 1) 용어 설명

<img src='./drag_and_drop.gif' width="300px" />

<br>

- DragDropContext
    - 기본적으로 드래그 앤 드랍을 가능하게 하고 싶은 앱의 한 부분이다. 
    - onDragEnd 프로퍼티를 가지고 있음.
    - onDragEnd(): 드래그가 끝날 때 실행되는 함수
    - https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/drag-drop-context.md
- Droppable
    - 드랍 할 수 있는 영역을 의미한다.
    - https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/droppable.md
- Draggable
    - 드래그 할 수 있는 영역을 의미한다.
    - https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/draggable.md

<br><br>

### 2) Droppable
- Droppable의 첫번쨰 인자는 공식 문서에서 볼 수 있듯이 provided이다.
- provided의 타입은 아래와 같다

```TypeScript
export interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => any;
    placeholder?: React.ReactElement<HTMLElement> | null | undefined;
    droppableProps: DroppableProvidedProps;
}
```

<br>

### 3) Draggable
- Draggable도 인자로 provided를 가지고 있다.

```TypeScript
export interface DraggableProvided {
    // will be removed after move to react 16
    innerRef: (element?: HTMLElement | null) => any;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
}
```
<br>

- 아래와 같이 dragHandleProps를 특정 element에 지정하면 'first' draggable 엘리먼트는 🔥 영역에서만 드래그 할 수 있다

```TypeScript
<Draggable draggableId='first' index={0}>
    {(provided) =>
        <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        >
        <span {...provided.dragHandleProps}>🔥</span>
        One
        </li>}
</Draggable>
<Draggable draggableId='second' index={1}>
    {(provided) =>
        <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        >
        Two
        </li>}
</Draggable>
```

<br><br>

드래그 앤 드롭이 가능하게 적용한 코드는 아래와 같다. (reordering은 아직 적용 안됨)  

https://github.com/yoojh9/react-master/commit/51a600f65daae077bbd533020aa5c838da01a3ce

```TypeScript
function App() {
  const onDragEnd = () => { }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='one'>
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}>
              <Draggable draggableId='first' index={0}>
                {(provided) =>
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <span {...provided.dragHandleProps}>🔥</span>
                    One
                  </li>}
              </Draggable>
              <Draggable draggableId='second' index={1}>
                {(provided) =>
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    Two
                  </li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
```

<br>
 
### 4) drag and drop 시 Droppable 영역 크기 유지하고 싶다면?
- Droppable의 provided 객체 중 placeholder를 이용한다.
- \{provided.placeholder\}

```TypeScript
<Droppable droppableId='one'>
{(provided) => (
    <Board
    ref={provided.innerRef}
    {...provided.droppableProps}>
    {toDos.map((toDo, index) =>
        <Draggable draggableId={toDo} index={index}>
        {(provided) =>
            <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
            {toDo}
            </Card>}
        </Draggable>
    )}
    {provided.placeholder}
    </Board>
)}
</Droppable>
```

<br>

### 5) onDragEnd
onDragEnd는 어떤 일이 일어났는지에 대한 정보로 많은 arguments를 준다. 

```TypeScript
{
    "draggableId": "b",
    "type": "DEFAULT",
    "source": {
        "index": 1,
        "droppableId": "one" // 같은 보드
    },
    "reason": "DROP",
    "mode": "FLUID",
    "destination": {
        "droppableId": "one",
        "index": 0
    },
    "combine": null
}
```

<br>

### 6) droppable > Snapshot 
 - isDraggingOver: 유저가 board 위로 드래그 해서 들어오고 있는지를 알려줄 수 있음
 - draggingFromTHisWhith: 해당 board로부터 드래그를 시작했는지 알려줌
 - https://github.com/yoojh9/react-master/commit/e620cd98345bbbd6cf6807c69d4928f2a92b867e
   
```TypeScript
export interface DroppableStateSnapshot {
    isDraggingOver: boolean;
    draggingOverWith?: DraggableId | undefined;
    draggingFromThisWith?: DraggableId | undefined;
    isUsingPlaceholder: boolean;
}
```

<br>

### 7) draggable > Snapshot 

```TypeScript
export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
    dropAnimation?: DropAnimation | undefined;
    draggingOver?: DroppableId | undefined;
    // the id of a draggable that you are combining with
    combineWith?: DraggableId | undefined;
    // a combine target is being dragged over by
    combineTargetFor?: DraggableId | undefined;
    // What type of movement is being done: 'FLUID' or 'SNAP'
    mode?: MovementMode | undefined;
}
```

<br><br>

# 2. Reordering
- splice(start, ?deleteCount. ...items) 사용
- splice는 배열에 변화(mutation)를 일으킴.
- reordering이 작용하려면 draggable의 key와 draggableId가 서로 같아야 함
- https://github.com/yoojh9/react-master/commit/185acbedc82b942951189291a66e0ea4436b2929

```TypeScript
  const [toDos, setTodos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTodos(oldTodos => {
      const copyToDos = [...oldTodos];
      // 1) Delete item on source.index
      copyToDos.splice(source.index, 1);
      // 2) Put back the item on the destination.index
      copyToDos.splice(destination?.index, 0, draggableId)
      return copyToDos;
    })
    console.log('drag is finished')
  }
```

<br>

### 1) Performance
현재 Reordering 시 모든 리스트가 리렌더링 되어 깜빡거리는 현상이 나타남.
- State가 변하면 해당 Component의 모든 children이 다시 렌더링 됨
- parent가 새로고침 되면 child도 새로고침 됨
- 만약 큰 parent component의 state를 바꾼다면 children도 다 re rendering 되어야 하고 이렇게 되면 앱도 느려질 수 있다. 가끔은 이 기능이 필요하지 않을 수도 있음
- 이럴때 필요한게 **react memo**이다.

<br>

### 2) Same Board Movement
board가 3개 일 때 같은 board 안에서만 reordering 되도록 처리  
https://github.com/yoojh9/react-master/commit/e0e8e46d154f6e41b4c2376bf1717c662f5a851d

<br>

### 3) Cross Board Movement
- board 간에도 reordering이 가능하도록 처리 
- todo 타입 string[] -> IToDo[]로 변경 

https://github.com/yoojh9/react-master/commit/c62596e2b03d0fdcd6f36cb6eef05cead9f6f28f

<br><br>


# 3. React Memo
- React에게 prop이 바뀌지 않는다면 이 Component는 렌더링 하지 말라고 알려 준다 
- React.memo는 prop이 바뀐 component만 렌더링 한다. 즉 위의 Reordering은 모든 컴포넌트가 아닌 변경된 컴포넌트들만 렌더링 됨

```TypeScript
export default DraggableCard;

// 아래처럼 작성하면 됨
export default React.memo(DraggableCard);
```

<br><br>

# 4. reference / useRef()
- react 코드를 이용해 HTML 요소를 지정하고, 가져올 수 있는 방법. 자바스크립트로부터 HTML 요소를 가져오고 수정하는 방법
- reference는 react JS component를 통해서 HTML 요소를 가져올 수 있도록 함
- **useRef()**: document.getElementById() 이런것과 유사하게 html 요소에 접근할 수 있음
- 이렇게 자바스크립트와 React.js를 이용해 모든 HTML 메소드에 접근할 수 있음.
- HTML method: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#methods

```TypeScript
function Board() {
    const inputRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        inputRef.current?.focus();
    }

    
    return (
        <div>
            <input ref={inputRef}>
            <button onClick={onClick}>click me</button>

        </div>
    )
}
```

<br><br>

# 5. Add To Do

이런식으로 하면 굳이 array push 작업이나 중복 되는지 체크하지 않아도 될 듯.

```TypeScript
setToDos((allBoards) => {
    return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo]
    };
})
```
