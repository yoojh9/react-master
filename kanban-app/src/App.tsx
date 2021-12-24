import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atom';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start
  width: 100%;
  gap: 10px;
`;


function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info)
    const { destination, draggableId, source } = info;
    if (destination?.droppableId === source.droppableId) {
      // same board move
      setTodos(allBoards => {
        console.log({ ...allBoards })
        const boardCopy = [...allBoards[source.droppableId]]
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      })
    }
    console.log('drag is finished')
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
