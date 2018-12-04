const notificationInst = document.querySelector(".notification");
const closeNotification = document.querySelector(".x-mark");
const windRight = document.querySelector("#right");
const windLeft = document.querySelector("#left");
const content = document.querySelector(".notification-textfield");
const number = document.querySelector(".index-number");
const choiseButtonsList = document.querySelector(".message-choise-buttons");

const messages = [
  'This is some usefull information for users of this page!',
  'This is another part of usefull information for users of this page!',
  'This is another one!',
  'Another one!',
  'And another one!'
];

let currentIndex = 0;

function load() {
  if(localStorage.getItem('reload') != 'false') {
    notificationInst.style.display = 'block';

    closeNotification.addEventListener('click',() => {
      if (document.querySelector("#tips").checked === true) {
        localStorage.setItem('reload', 'false');
      }
      notificationInst.style.display = 'none'; 
    });

    if (messages.length <= 10) {
      content.appendChild(document.createTextNode(messages[0]));
      messages.forEach((item, index) => {
        const choiseButton = document.createElement('i');
        const choiseItem = document.createElement('li');
        if (index === 0) {
          choiseItem.className = 'choise-item chosen';
        } else {
          choiseItem.className = 'choise-item unchosen';
        }
        choiseButton.className = 'fas fa-circle';
        choiseItem.appendChild(choiseButton);
        choiseItem.addEventListener('click', () => {
          if (choiseItem.className === 'choise-item unchosen') {
            choiseItem.className = 'choise-item chosen';
            choiseButtonsList.childNodes[currentIndex].className = 'choise-item unchosen';
            currentIndex = index;
            renderMessage(item);
          }
        });
        choiseButtonsList.appendChild(choiseItem);
      });
    } else {
      alert('Too musch messages!');
      return 0;
    }

    windRight.addEventListener('click', moveToRight);
    windLeft.addEventListener('click', moveToLeft);

    document.onkeydown = function(event) {
      if (event.keyCode === 37) {
        moveToLeft()
      } else if (event.keyCode === 39) {
        moveToRight()
      }
    }
  }
}

function renderMessage(message) {
  let newMessage = document.createTextNode(message);
  content.innerHTML = '';
  content.appendChild(newMessage);
}

function moveToRight(){
  if (currentIndex !== 4) {
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item unchosen';
    currentIndex++;
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item chosen';
    renderMessage(messages[currentIndex]);
  } else {
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item unchosen';
    currentIndex = 0;
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item chosen';
    renderMessage(messages[currentIndex]);
  }
}

function moveToLeft(){
  if (currentIndex !== 0) {
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item unchosen';
    currentIndex--;
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item chosen';
    renderMessage(messages[currentIndex]);
  } else {
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item unchosen';
    currentIndex = 4;
    choiseButtonsList.childNodes[currentIndex].className = 'choise-item chosen';
    renderMessage(messages[currentIndex]);
  }
}