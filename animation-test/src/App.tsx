import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, rgb(116, 185, 255), rgb(223, 230, 233));
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const Grid = styled.div`
  display: grid;
  width: 50vw;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  div:first-child, div:last-child {
    grid-column: span 2;
  }
`

const Box = styled(motion.div)`
  height: 100px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`


function App() {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked(prev => !prev);

  return (
    <Wrapper onClick={toggle}>
      <Grid>
        <Box layoutId="hello"/>
        <Box />
        <Box />
        <Box />
      </Grid>
      <AnimatePresence>
        {clicked ? 
          <Overlay 
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} 
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}} 
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
              <Box layoutId="hello" style={{width:400, height: 200}}/>
          </Overlay> : 
          null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
