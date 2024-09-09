export interface Queue {
  id: string;
  queueThumbNail: string[];
  songCount: number;
  totalPlayTime: number;
  tracks: Track[];
  userId: string;
}

export interface Track {
  id: string;
  trackNumber: number;
  trackTitle: string;
  trackTime: number;
  trackURL: string;
  artistName: string;
  albumId: string;
  albumName: string;
  albumArtURL: string;
  peaks: number[];
}

export interface GenrePreview {
  id: string;
  genre: string;
}

export interface AlbumInfo {
  id: string;
  albumCode: string;
  albumName: string;
  albumArtURL: string;
  albumType: string;
  albumInfo?: string;
  tracks: Track[];
  genres: GenrePreview[];
  artist: {
    id: string;
    artistInfo: string;
    artistName: string;
  };
  createdAt: string;
  updatedAt: string;
  releasedAt?: Date;
}

export interface PlaylistSimple {
  id: string;
  isPublic: boolean;
  playListName: string;
  thumbNail: string[];
  count: number;
  tracks: Track[];
  updatedAt: Date;
}

export interface Playlist {
  id: string;
  isPublic: boolean;
  playListName: string;
  thumbNail: string[];
  count: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tracks: Track[];
}
