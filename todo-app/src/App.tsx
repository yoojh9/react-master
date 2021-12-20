import { createGlobalStyle } from "styled-components";
import ToDoList from "./components/TodoList";

// global scope style
// styled-reset 그대로 복사 (https://github.com/zacanger/styled-reset/blob/master/src/index.ts)
const GlobalStyle = createGlobalStyle`
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;