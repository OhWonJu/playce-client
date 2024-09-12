import styled from "styled-components";
import tw from "twin.macro";

export const Flat = styled.button<any>`
  background-color: var(--primary);
  color: var(--secondary);
`;

export const Plain = styled.button<any>``;

export const Ghost = styled.button<any>`
  color: ${props => props.theme.text_primary_color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;

  ${tw`shadow hover:shadow-inner transition-shadow border-neutral-300 dark:border-neutral-700`}
`;

export const Outline = styled.button<any>`
  border-width: 1px;
  border-color: var(--primary-foreground);

  ${tw`hover:bg-neutral-200/50 dark:hover:bg-neutral-700`}
`;

export const Link = styled.button<any>`
  text-decoration: underline;
  text-underline-offset: 0.5rem;
`;

export const Disabled = styled.button`
  border-width: 0px;
  background-color: var(--primary-foreground);
  background-color: ${props => props.theme.gray_primary};

  ${tw`text-white`}
`;

export const RippleEffect = styled.span`
  span {
    background-color: var(--puls);
  }
`;
