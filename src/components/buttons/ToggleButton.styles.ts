import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

export const ToggleButtonWrapper = styled.div<any>`
  width: 160px;
  height: 100px;
  background-color: var(--primary-foreground);
  display: flex;
  border-radius: 50px;
  padding: 10px;
  cursor: pointer;

  justify-content: ${props => (props.$isOn ? "flex-end" : "flex-start")};

  ${tw`shadow-inner`}
`;

export const ToggleHandle = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: var(--white);
  border-radius: 40px;

  ${tw`shadow-md`}
`;
