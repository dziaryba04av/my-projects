import { navUpdate } from './NavUpdate';
import { Clip } from './nodes/Clip';
import { data } from './data';

export function loadClips(url) {
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(json => {
      json.items.forEach(item => {
        data.clipsList.style.width = `${data.clipsList.clientWidth + 300}px`
        data.clipsList.appendChild(Clip(item));
      });
      navUpdate();
    });
}