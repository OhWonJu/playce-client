import { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "framer-motion";

import { usersQueryKeys } from "@/api/users";
import type { GetUserAlbumsResponse } from "@/api/users";

import useListsQuery from "@/hooks/useListsQuery";
import useMeStore from "@/stores/useMeStore";

import { Heading, MusicCard } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";

import { PlayableContainer } from "@/styles/GlobalStyles";

const CabinetAlbumsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "20%",
  });

  const navigate = useNavigate();
  const id = useMeStore(state => state.id);

  const {
    data: albumsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // status,
    isLoading,
  } = useListsQuery<GetUserAlbumsResponse>({
    queryKey: usersQueryKeys.getAlbums(id),
    apiUrl: `/users/${id}/albums`,
  });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isInView]);

  return (
    <PlayableContainer>
      <Heading title="나의 앨범" className="mb-14" />
      <div className=" w-full space-y-8 scrollbar-hide">
        {!isLoading &&
          albumsData?.pages?.map((group, i) => (
            // @ts-ignore
            <Fragment key={i}>
              {group.albums.map(album => (
                <MusicCard
                  key={album.id}
                  title={album.albumName}
                  imageUrl={album.albumArtURL}
                  subTitle={album.artist.artistName}
                  size="lg"
                  onClick={() =>
                    navigate(`/albums/${album.albumName}?albumId=${album.id}`)
                  }
                />
              ))}
            </Fragment>
          ))}
        {/* {isLoading &&
          Array(8)
            .fill(0)
            .map((_, i) => (
              //@ts-ignore
              <Skeleton key={i} className="rounded-lg w-full h-[60px]" />
            ))} */}
      </div>
      <div ref={ref} />
    </PlayableContainer>
  );
};

export default CabinetAlbumsPage;
