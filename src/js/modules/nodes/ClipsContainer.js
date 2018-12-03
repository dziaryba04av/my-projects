import  {loadChunk } from '../LoadChunk'
import { data } from '../data';

export function ClipsContainer() { 
  const container = document.createElement('div');
  const list = document.createElement('ul');
  list.addEventListener('mousedown', (e) => {
    const firstPoint = e.pageX;
    list.onmouseup = (e) => {
      const secondPoint = e.pageX;
      const current = document.querySelector('.selected');
      if (firstPoint > secondPoint && Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0])) <= data.clipsList.clientWidth - data.clipsContainer.clientWidth) {
        const next = document.getElementById(parseInt(current.id) + 1);
        next.className = 'selected';
        current.className = 'unselected';
        data.clipsList.style.marginLeft = `-${Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0])) + data.clipsContainer.clientWidth}px`;
        data.navList.style.marginLeft = `${40 - (parseInt(next.id) * 20) }px`
        loadChunk();

      } else if ((firstPoint < secondPoint && Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0])) >= data.clipsContainer.clientWidth)) {
        const next = document.getElementById(parseInt(current.id) - 1);
        next.className = 'selected';
        current.className = 'unselected';
        data.clipsList.style.marginLeft = `-${Math.abs(parseInt(data.clipsList.style.marginLeft.split('px')[0])) - data.clipsContainer.clientWidth}px`; 
        data.navList.style.marginLeft = `${40 - (parseInt(next.id) * 20) }px`
        loadChunk();
      }
      list.onmouseup = null;
    }
  });
  container.className = 'clips-container';
  list.style.marginLeft = '0px';
  container.appendChild(list);
  return container;
}