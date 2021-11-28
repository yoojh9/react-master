import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color:white;

`;


function App() {
  return (
    // <div style={{ display: 'flex' }}>
    //   <div style={{ backgroundColor: 'teal', width: 100, height: 100 }}></div>
    //   <div style={{ backgroundColor: 'tomato', width: 100, height: 100 }}></div>
    // </div>

    <Father>
      <BoxOne>
        <Text>Hello</Text>
      </BoxOne>
      <BoxTwo />
    </Father>
  );
}

export default App;
