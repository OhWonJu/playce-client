import Avatar from "@/components/Avatar";

import useMeStore from "@/stores/useMeStore";

import { PlayableContainer } from "@/styles/GlobalStyles";

const CabinetPage = () => {
  const { nickName, image } = useMeStore();

  return (
    <PlayableContainer>
      <section className="w-full flex flex-col justify-center items-center">
        <Avatar imageUrl={image} size="xl" />
        <span>{nickName}</span>
      </section>
    </PlayableContainer>
  );
};

export default CabinetPage;
