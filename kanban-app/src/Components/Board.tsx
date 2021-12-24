import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

interface IBoardProps {
    toDos: string[],
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    console.log('toDos', toDos);
    return (
        <Droppable droppableId={boardId}>
            {(provided) => (
                <Wrapper
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {toDos.map((toDo, index) => {
                        console.log('toDo ', toDo, "index ", index)
                        return <DraggableCard key={toDo} index={index} toDo={toDo} />
                    }
                    )}
                    {provided.placeholder}
                </Wrapper>
            )}
        </Droppable>
    )
}

export default Board;