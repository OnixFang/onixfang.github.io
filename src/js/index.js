// Utilities
function getRandom(range) {
  return Math.floor(Math.random() * range);
}

// Copyright year
document.getElementById('copy-year').innerHTML = new Date().getFullYear();

// Navbar drawer
const navButton = document.getElementById('menu-button');
navButton.addEventListener('click', (e) => {
  navButton.classList.toggle('open');
  document.getElementById('navbar').classList.toggle('open');
});

// Picture's click interaction
const salutations = ['Hello!', 'Hi!', 'Hey!', "What's up!?"];
let helloTimeOut;

const heroPic = document.getElementsByClassName('hero-picture')[0];

heroPic.addEventListener('click', () => {
  const helloElement = document.getElementsByClassName('hello')[0];
  helloElement.innerHTML = salutations[getRandom(4)];
  helloElement.classList.add('show');

  clearTimeout(helloTimeOut);

  helloTimeOut = setTimeout(() => {
    helloElement.classList.remove('show');
  }, 2000);
});

// Intersection Observer for animations
const elements = document.querySelectorAll('.animate');

const observerFunction = (entries) => {
  entries.forEach((entry) => {
    const element = entry.target;
    const { animation } = element.dataset;

    if (entry.isIntersecting) {
      element.style.animation = `${animation} 500ms ease ${getRandom(200)}ms forwards`;
    } else {
      element.style.animation = 'none';
    }
  });
};

const animationObserver = new IntersectionObserver(observerFunction);

elements.forEach((element) => {
  animationObserver.observe(element);
});

// Intersection Observer for navbar
const sections = document.querySelectorAll('section');
const navlinks = Array.from(document.querySelectorAll('.navlink'));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const section = entry.target;
      const navlink = navlinks.find((link) => link.href.endsWith(`#${section.id}`));

      if (entry.isIntersecting) {
        navlink.classList.add('active');
        let prevIndex = navlinks.indexOf(navlink) - 1;
        let nextIndex = navlinks.indexOf(navlink) + 1;

        navlinks[nextIndex].classList.remove('active');
        if (prevIndex >= 0) {
          navlinks[prevIndex].classList.remove('active');
        }
      } else {
        navlink.classList.remove('active');
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
