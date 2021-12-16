import { createGlobalStyle, ThemeProvider } from "styled-components";

// global scope style
// styled-reset 그대로 복사 (https://github.com/zacanger/styled-reset/blob/master/src/index.ts)
const GlobalStyle = createGlobalStyle`
`;

function App() {
  return (
    <>
      <GlobalStyle />
    </>
  );
}

export default App;