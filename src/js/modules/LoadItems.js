import { loadClips } from './LoadClips';
import { data } from './data';

export function loadItems(url) {
  if (url) {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        let clipsRequestUrl = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=';
        json.items.forEach(item => {
          clipsRequestUrl = `${clipsRequestUrl},${item.id.videoId}`;
        });
        clipsRequestUrl = `${clipsRequestUrl}&part=snippet,statistics`;
        data.nextPageToken = json.nextPageToken;
        loadClips(clipsRequestUrl);
      })
  }
}