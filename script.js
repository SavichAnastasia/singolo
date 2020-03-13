const navElement = document.querySelector('header nav');
const navLinks = document.querySelectorAll('header nav a');

navElement.addEventListener('click', (e) => {
    navLinks.forEach(link => {
        link.classList.remove('active')
    })
    e.target.classList.add('active');
})