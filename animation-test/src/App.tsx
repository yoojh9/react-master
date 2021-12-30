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

const Box = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00A5FF;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`


function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(prev => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
        <Box >
          { !clicked ? <Circle layoutId="circle" style={{borderRadius: '50px'}}/> : null}
        </Box>
        <Box >
          { clicked ? <Circle layoutId="circle" style={{borderRadius: '0px', scale: 2}}/> : null}
        </Box>
    </Wrapper>
  );
}

export default App;
