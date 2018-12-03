import { SearchForm } from './modules/nodes/SearchForm';
import { ClipsContainer } from './modules/nodes/ClipsContainer';
import { navUpdate } from './modules/NavUpdate';
import { Navigation } from './modules/nodes/Navigation';
import { NavigationButton } from './modules/nodes/NavigationButton';
import { Clip } from './modules/nodes/Clip';
import { data } from './modules/data';
 
data.clipsContainer = ClipsContainer();
data.clipsList = data.clipsContainer.firstChild;
data.searchForm = SearchForm();
data.navigation = Navigation();
data.navList = data.navigation.firstChild;

document.body.appendChild(data.searchForm);
document.body.appendChild(data.clipsContainer);
document.body.appendChild(data.navigation);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1140 && data.clipsContainer.clientWidth !== 1200) {
    data.clipsContainer.style.width = '1200px';
    if ((parseInt(data.clipsList.style.marginLeft.split('px')[0]) % data.clipsContainer.clientWidth) !== 0) {
      data.clipsList.style.marginLeft = `-${Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0]) - parseInt(data.clipsList.style.marginLeft.split('px')[0]) % data.clipsContainer.clientWidth)}px`;
    }
    navUpdate();
  } else if (window.innerWidth < 1140 && window.innerWidth >= 720 && data.clipsContainer.clientWidth !== 600) {
    data.clipsContainer.style.width = '600px';
    if ((parseInt(data.clipsList.style.marginLeft.split('px')[0]) % data.clipsContainer.clientWidth) !== 0) {
      data.clipsList.style.marginLeft = `-${Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0]) - parseInt(data.clipsList.style.marginLeft.split('px')[0]) % data.clipsContainer.clientWidth)}px`;
    }
    navUpdate();
  } else if (window.innerWidth < 720 && data.clipsContainer.clientWidth !== 300) {
    data.clipsContainer.style.width = '300px';
    if ((parseInt(data.clipsList.style.marginLeft.split('px')[0]) % data.clipsContainer.clientWidth) !== 0) {
      data.clipsList.style.marginLeft = `-${Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0]) - parseInt(data.clipsList.style.marginLeft.split('px')[0]) % data.clipsContainer.clientWidth)}px`;
    }
    navUpdate();
  }
});

window.onload = () => {
  if (window.innerWidth >= 1140) {
    data.clipsContainer.style.width = '1200px';
  } else if (window.innerWidth < 1140 && window.innerWidth >= 720) {
    data.clipsContainer.style.width = '600px';
  } else if (window.innerWidth < 720) {
    data.clipsContainer.style.width = '300px';
  }
}
