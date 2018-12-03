import { data } from '../data';

export function NavigationButton(num) {
  const item = document.createElement('li');
  const button = document.createElement('button');

  button.appendChild(document.createTextNode(num));
  if (parseInt(data.clipsList.style.marginLeft.split('px')[0]) === -(num * data.clipsContainer.clientWidth)) {
    button.className = 'selected';
  } else {
    button.className = 'unselected';
  }
  button.id = num;
  item.appendChild(button);
  return item;
}