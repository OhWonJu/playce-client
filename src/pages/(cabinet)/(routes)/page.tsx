import { ToggleButton } from "@/components";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PlayableContainer } from "@/styles/GlobalStyles";

const CabinetPage = () => {
  const [localTheme, setTheme] = useLocalStorage("theme");

  return (
    <PlayableContainer>
      <ToggleButton
        onFunc={() => setTheme("dark")}
        offFunc={() => setTheme("light")}
        initToggleState={localTheme === "light" ? false : true}
      />
    </PlayableContainer>
  );
};

export default CabinetPage;
