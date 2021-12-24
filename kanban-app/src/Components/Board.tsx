import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;

`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromTHisWhith ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
`;

interface IAreaProps {
    isDraggingOver: boolean,
    isDraggingFromTHisWhith: boolean
}

interface IBoardProps {
    toDos: string[],
    boardId: string
}

function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                    <Area
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromTHisWhith={Boolean(snapshot.draggingFromThisWith)}
                        {...provided.droppableProps}>
                        {toDos.map((toDo, index) => {
                            console.log('toDo ', toDo, "index ", index)
                            return <DraggableCard key={toDo} index={index} toDo={toDo} />
                        }
                        )}
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;