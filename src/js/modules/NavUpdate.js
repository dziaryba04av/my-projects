import { NavigationButton } from './nodes/NavigationButton';
import { data } from './data';

export function navUpdate() {
  if (data.navList.childNodes.length !== 0) {
    while (data.navList.firstChild) {
      data.navList.removeChild(data.navList.firstChild);
    }
  }
  data.navList.style.width = '0px';
  data.navList.style.marginLeft = `-${(Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0])) / data.clipsContainer.clientWidth * 20) - 40}px`

  for (let i = 0; i < data.clipsList.clientWidth / data.clipsContainer.clientWidth; i++) {
    data.navList.style.width = `${data.navList.clientWidth + 20}px`;
    data.navList.appendChild(NavigationButton(i));
  }
}