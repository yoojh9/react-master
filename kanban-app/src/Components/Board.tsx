import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`

interface IBoardProps {
    toDos: string[],
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided) => (
                    <div style={{ backgroundColor: 'lightgrey' }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {toDos.map((toDo, index) => {
                            console.log('toDo ', toDo, "index ", index)
                            return <DraggableCard key={toDo} index={index} toDo={toDo} />
                        }
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;