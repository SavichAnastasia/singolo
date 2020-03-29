//header
document.addEventListener('scroll', onScroll);

function onScroll(e) {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    sections.forEach(section => {
        if (Math.ceil(window.scrollY) >= section.offsetTop && window.scrollY < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === section.getAttribute('id')) link.classList.add('active')
            })
        }
    })
}


//slider
let items = document.querySelectorAll('section.slider .slide');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.slider-arrow.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.slider-arrow.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});


//phone
const iPhoneVerticalScreen = document.querySelector('.iphone-vertical-screen');
const iPhoneHorizontalScreen = document.querySelector('.iphone-horizontal-screen');

document.querySelector('.iphone-horizontal-base').addEventListener('click', (e) => {
    iPhoneHorizontalScreen.classList.toggle('hidden')
})

document.querySelector('.iphone-vertical-base').addEventListener('click', (e) => {
    iPhoneVerticalScreen.classList.toggle('hidden')
})


//portfolio
const portfolioMenu = document.querySelector('.portfolio-menu');
const portfolioBtns = document.querySelectorAll('.portfolio-menu button');
const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioImagesContainer = document.querySelector('.portfolio-images-container');


portfolioMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('active') || e.target.classList.contains('portfolio-menu')) return;
    portfolioBtns.forEach(button => {
        button.classList.remove('active');
    })

    e.target.classList.add('active');
    const newPortfolioImages = [...document.querySelectorAll('.portfolio-image')];
    portfolioImagesContainer.innerHTML = '';
    for (let i = 0; i < newPortfolioImages.length; i++) {
        if (i === portfolioImages.length - 1) {
            portfolioImagesContainer.append(newPortfolioImages[0])
        } else {
            portfolioImagesContainer.append(newPortfolioImages[i + 1])
        }
    }
})

portfolioImagesContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('portfolio-image')) return;
    const clicked = e.target.classList.contains('active');
    portfolioImages.forEach(image => {
        image.classList.remove('active');
    })
    if (!clicked) e.target.classList.add('active');
})

//quote
const modal = document.querySelector('.modal');
const subject = document.querySelector('.modal .subject');
const description = document.querySelector('.modal .description');
const quoteForm = document.forms.quote;
const formInputs = [...quoteForm.elements];

quoteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    subject.textContent = this.elements.subject.value || 'No subject';
    description.textContent = this.elements.description.value || 'No description';
    showModal()
})

function showModal () {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideModal () {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    formInputs.forEach(el => {
        el.value = '';
    })
}

modal.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal-window')) hideModal()
})

document.querySelector('.modal button').addEventListener('click', (e) => {
    hideModal()
})


//header 375px
const header = document.querySelector('header');
const cover = document.querySelector('header .modal-cover');
const navEl = document.querySelectorAll('nav a');


document.querySelector('.burger-btn').addEventListener('click', (e) => {
    header.classList.toggle('burger');
})

cover.addEventListener('click', (e) => {
    hideBurger()
})

navEl.forEach(el => {
    el.addEventListener('click', hideBurger)
})

function hideBurger () {
    header.classList.remove('burger');
}