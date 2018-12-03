import { loadChunk } from '../LoadChunk';
import { data } from '../data';

export function Navigation() {
  const navContainer = document.createElement('div');
  const list = document.createElement('ul');
  list.style.marginLeft = '40px'

  navContainer.className = 'nav-container';
  list.addEventListener('click', (e) => {
    if (e.target.id) {
      data.clipsList.style.marginLeft = `-${e.target.id * data.clipsContainer.clientWidth}px`;
      document.querySelector('.selected').className = 'unselected';
      e.target.className = 'selected';
      data.navList.style.marginLeft = `${40 - (parseInt(e.target.id) * 20) }px`
      loadChunk();
    }
  }); 
  navContainer.appendChild(list);
  return navContainer;
}