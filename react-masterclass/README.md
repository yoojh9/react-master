# Styled Components

<br><br>

### 1. create-react-app

```
npx create-react-app my-app
```

<br>

### 2. Styled Component 설치

```
npm install styled-components
```

<br>

### 3. Adapting and Extending

- 속성 값을 외부에서 받아 스타일을 재사용 할 수 있음.
   
```
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;

<Box bgColor="teal"/>
<Box bgColor="tomato" />
```

- 스타일 값을 상속 받을 수도 있음(Extend)   

```
const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;
```

