import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, rgb(116, 185, 255), rgb(223, 230, 233));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    }
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    }
  }
}


function App() {
  const [visible, setVisible] = useState(1);
  const nextPlease = () => setVisible(prev => prev === 10 ? 10 : prev+1);


  return (
    <Wrapper>
      <AnimatePresence>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => 
            number === visible ? (
              <Box 
                variants={boxVariants} 
                initial="invisible" 
                animate="visible" 
                exit="exit" 
                key={number}>
                  {number}
              </Box>
            ) : null
          )
        }
      </AnimatePresence> 
      <button onClick={nextPlease}>next</button>
    </Wrapper>
  );
}

export default App;
