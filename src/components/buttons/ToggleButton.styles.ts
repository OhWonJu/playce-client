import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

export const ToggleButtonWrapper = styled.div<any>`
  background-color: var(--primary-foreground);
  display: flex;
  border-radius: 50px;
  cursor: pointer;

  justify-content: ${props => (props.$isOn ? "flex-end" : "flex-start")};

  ${tw`shadow-inner`}
`;

export const ToggleHandle = styled(motion.div)`
  background-color: var(--white);
  border-radius: 40px;

  ${tw`shadow-md`}
`;
