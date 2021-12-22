# Kanban App

## 1. react-beautiful-dnd: drag and drop
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