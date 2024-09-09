import { GetPlaylistsResponse } from "@/api/playlist";
import { _GET } from "@/api/rootAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";

interface PlaylistsQueryProps {
  queryKey: string[];
  apiUrl: string;
  initPageParam?: any;
}

const usePlaylistsQuery = ({
  queryKey,
  apiUrl,
  initPageParam,
}: PlaylistsQueryProps) => {
  const fetchPlaylists = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
        },
      },
      { skipNull: true },
    );

    const res = await _GET<GetPlaylistsResponse>(url);

    return res;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: fetchPlaylists,
    getNextPageParam: lastPage => lastPage?.nextCursor,
    initialPageParam: initPageParam ? initPageParam : undefined,
    staleTime: 30 * 60 * 1000,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  };
};

export default usePlaylistsQuery;
