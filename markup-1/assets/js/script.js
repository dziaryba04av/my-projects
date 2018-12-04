const currentDomain = document.querySelector('.domain-label')
const dropDownLabel = document.querySelector('.domain-label i');
const dropDownList = document.querySelector('.domain-dropdown');
const domains = document.querySelectorAll('.domain-dropdown li');


dropDownLabel.addEventListener('click', () => {
    dropDownLabel.className = dropDownLabel.className === 'fa fa-angle-down' ? 
    'fa fa-angle-up' : 'fa fa-angle-down';

    dropDownList.className = dropDownList.className === 'domain-dropdown hidden' ?
    'domain-dropdown visible' : 'domain-dropdown hidden';
});

domains.forEach(item => {
    item.addEventListener('click', () => {
        currentDomain.removeChild(currentDomain.lastChild);
        currentDomain.appendChild(document.createTextNode(item.id));
        dropDownLabel.className = 'fa fa-angle-down';
        dropDownList.className = 'domain-dropdown hidden';
    });
});

const singleComment = document.querySelector('.single-comment');
const commentOwnerName = document.querySelector('.comment-owner-name');
const ownerSelect = document.querySelectorAll('.comment-owner-select li i');
const names = ['John Doe', 'Jonny Doe', 'Johnathan Doe'];
const sayings = ['“Suspendisse tempor turpis odio, sit amet cursus leo consequat non. Maecenas lacinia faucibus enimqui interdum dolor pulvinar vitae.”',
                 '“Yeah Dude! Suspendisse tempor turpis odio, sit amet cursus leo consequat non. Maecenas lacinia faucibus enimqui interdum dolor pulvinar vitae.”',
                 '“Definetely! Suspendisse tempor turpis odio, sit amet cursus leo consequat non. Maecenas lacinia faucibus enimqui interdum dolor pulvinar vitae.”']
let currentCircle = 0;

ownerSelect.forEach((item, index) => {
    item.addEventListener('click', () => {
        commentOwnerName.removeChild(commentOwnerName.lastChild);
        commentOwnerName.appendChild(document.createTextNode(names[index]));
        ownerSelect[currentCircle].className = 'fa fa-circle-o'; 
        currentCircle = index;
        ownerSelect[currentCircle].className = 'fa fa-circle'
        singleComment.removeChild(singleComment.lastChild);
        singleComment.appendChild(document.createTextNode(sayings[index]));
    });
});
