import styled from "styled-components";
import tw from "twin.macro";

function App() {
  return <Hello>Hello Playce</Hello>;
}

export default App;

const Hello = styled.div`
  ${tw`font-bold text-2xl`}
`;
