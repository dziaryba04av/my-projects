import { loadItems } from './loadItems';
import { data } from './data';

 
export function loadChunk() {
  if (Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0])) >= data.clipsList.clientWidth - 1200) {
      const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&pageToken=${data.nextPageToken}&part=snippet&maxResults=15&q=${data.searchValue}`;
      loadItems(url);
  }
}