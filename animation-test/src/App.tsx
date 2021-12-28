import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(116, 185, 255), rgb(223, 230, 233));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1])
  const rotate = useTransform(x, [-800, 800], [-360, 360])
  const gradient = useTransform(x, [-800, 0, 800], [
    "linear-gradient(135deg, rgb(41, 144, 248), rgb(143, 217, 248))",
    "linear-gradient(135deg, rgb(116, 185, 255), rgb(223, 230, 233))",
    "linear-gradient(135deg, rgb(216, 234, 252), rgb(57, 123, 245))",
  ])

  useEffect(() => {
    //x.onChange(() => console.log(x.get()))
    scale.onChange(() => console.log(scale.get()))
  }, [x])

  return (
    <Wrapper style={{ background: gradient }}>
      <Box
        style={{ x: x, rotate }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default App;
