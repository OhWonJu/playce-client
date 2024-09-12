import { ToggleButton } from "@/components";
import Avatar from "@/components/Avatar";
import { Moon, Sun } from "@/components/icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useMeStore from "@/stores/useMeStore";
import { PlayableContainer } from "@/styles/GlobalStyles";

const CabinetPage = () => {
  const [theme, setTheme] = useLocalStorage("theme");
  const { nickName, image } = useMeStore();

  return (
    <PlayableContainer>
      <section className="w-full flex flex-col justify-center items-center">
        <Avatar imageUrl={image} size="xl" />
        <span>{nickName}</span>
      </section>
      {theme === "dark" ? <Moon /> : <Sun />}
      <ToggleButton
        onFunc={() => setTheme("dark")}
        offFunc={() => setTheme("light")}
        initToggleState={theme === "light" ? false : true}
      />
    </PlayableContainer>
  );
};

export default CabinetPage;
