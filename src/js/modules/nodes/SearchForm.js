import { loadItems } from '../LoadItems'
import { navUpdate } from '../NavUpdate';
import { data } from '../data';

export function SearchForm() {
  const searchForm = document.createElement('form');
  const searchField = document.createElement('input');
  const searchButton = document.createElement('button');
  const searchIcon = document.createElement('i');
  searchField.style.type = 'text';
  searchIcon.className = 'fas fa-search';
  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (data.clipsList.childNodes.length !== 0) {
      while (data.clipsList.firstChild) {
        data.clipsList.removeChild(data.clipsList.firstChild);
      }
    }
    data.clipsList.style.width = '0px';
    data.clipsList.style.marginLeft = '0px';
    data.navList.style.marginLeft = '40px';
    
    if (searchField.value) {
      data.searchValue = searchField.value;
      loadItems(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=15&q=${searchField.value}`);
    }
    navUpdate();
  });
  searchButton.appendChild(searchIcon);
  searchForm.appendChild(searchButton);
  searchForm.appendChild(searchField);
  return searchForm;
} 