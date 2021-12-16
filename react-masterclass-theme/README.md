# Theme

<br><br>

### 1. Theme 설정

```TypeScript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "styled-components";
import App from './App';


const darkTheme = {
  textColor: "whitesmoke",
  backgrondColor: "#111",

}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

<br><br>

```TypeScript
// App.js

import styled from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgrondColor}
`;

const App = () =>
  <Wrapper>
    <Title>Hello</Title>
  </Wrapper>;

export default App;

```
