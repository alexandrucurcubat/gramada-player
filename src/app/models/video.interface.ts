export interface Video {
  videoId: string;
  channelTitle: string;
  description: string;
  publishTime: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  title: string;
  isPlaying?: boolean;
  boost?: number;
  boosted?: boolean;
  addedTimestamp?: any;
}
