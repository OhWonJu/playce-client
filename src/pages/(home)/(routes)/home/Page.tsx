import { _POST } from "@/api/rootAPI";

import { MusicCard, MusicList } from "@/components";
import useMeStore from "@/stores/useMeStore";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { nickName } = useMeStore();
  const navigate = useNavigate();

  const replayListRenderer = () =>
    Array.from({ length: 2 }, (_, index) => ({
      index,
      id: "-",
      title: "My Queue",
      subTitle: "00 songs • 00min",
    })).map(item => (
      <MusicCard key={item.index} title={item.title} subTitle={item.subTitle} />
    ));

  const myAlbumsRenderer = () =>
    Array.from({ length: 14 }, (_, index) => ({
      index,
      id: "-",
      title: "Title",
    })).map(item => (
      <MusicCard
        key={item.index}
        title={item.title}
        onClick={() => navigate(`/albums/${item.id}`)}
      />
    ));

  return (
    <div className="flex flex-col">
      Wellcome {nickName}
      <MusicList
        title="다시 듣기"
        singleLine
        renderer={replayListRenderer}
        className="mb-14"
      />
      <MusicList
        title="나의 앨범"
        exceptionGuide="가지고 있는 앨범이 없어요. 멋진 앨범들을 구경해볼까요?"
        exceptionAction={() => navigate("/explore")}
        renderer={myAlbumsRenderer}
        className="mb-14"
      />
      <MusicList
        title="나의 플레이리스트"
        exceptionGuide={`플레이리스트가 없어요. 새로운 플레이리스트를 만들어볼까요?`}
        exceptionAction={() => navigate("/my/playlists")}
        className="mb-14"
      />
    </div>
  );
};

export default HomePage;
