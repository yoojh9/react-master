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
board 간에도 reordering이 가능하도록 처리

<br><br>


# 3. React Memo
- React에게 prop이 바뀌지 않는다면 이 Component는 렌더링 하지 말라고 알려 준다 
- React.memo는 prop이 바뀐 component만 렌더링 한다. 즉 위의 Reordering은 모든 컴포넌트가 아닌 변경된 컴포넌트들만 렌더링 됨

```TypeScript
export default DraggableCard;

// 아래처럼 작성하면 됨
export default React.memo(DraggableCard);
```

