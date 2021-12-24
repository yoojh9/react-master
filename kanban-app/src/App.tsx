import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atom';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;


function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // setTodos(oldTodos => {
    //   const copyToDos = [...oldTodos];
    //   // 1) Delete item on source.index
    //   copyToDos.splice(source.index, 1);
    //   // 2) Put back the item on the destination.index
    //   copyToDos.splice(destination?.index, 0, draggableId)
    //   return copyToDos;
    // })
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
