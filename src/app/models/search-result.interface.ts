export interface SearchResult {
  etag: string;
  items: Item[];
  kind: string;
  nextPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
}

interface Item {
  etag: string;
  id: { kind: string; videoId: string };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
    title: string;
  };
}
