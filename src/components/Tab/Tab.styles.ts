import styled from "styled-components";
import tw from "twin.macro";

export const Tabs = styled.ul`
  list-style: none;
  border-bottom-width: 1.5px;
  border-color: var(--puls);

  ${tw`bg-opacity-80`}
`;

export const Tab = styled.li`
  list-style: none;

  border-bottom-right-radius: 0;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 0;
  user-select: none;

  .underline {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--primary);
  }
`;

export const TabText = styled.a<{ $focused?: boolean }>`
  color: ${props =>
    props.$focused ? "var(--primary)" : "var(--primary-foreground)"};

  ${tw`w-full text-center text-sm font-bold`};
`;
