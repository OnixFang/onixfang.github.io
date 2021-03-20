// Page elements ----------------------------------------------------------------------------------
const navbar = document.getElementById('navbar');
const navlinks = Array.from(document.querySelectorAll('.navlink'));
const navButton = document.getElementById('menu-button');
const sections = document.querySelectorAll('section');

// Utilities --------------------------------------------------------------------------------------
function getRandom(range) {
  return Math.floor(Math.random() * range);
}

// Copyright year ---------------------------------------------------------------------------------
document.getElementById('copy-year').innerHTML = new Date().getFullYear();

// Navbar drawer
navButton.addEventListener('click', (e) => {
  navButton.classList.toggle('open');
  navbar.classList.toggle('open');
});

navlinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    navButton.classList.remove('open');
    navbar.classList.remove('open');
  });
});

// Picture's click interaction --------------------------------------------------------------------
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

// Intersection Observer for animations -----------------------------------------------------------
const elements = document.querySelectorAll('.animate');

const observerFunction = (entries) => {
  entries.forEach((entry) => {
    const element = entry.target;
    const { animation, duration, delay, sync } = element.dataset;

    // Default values
    const animSync = sync ? sync : 0;
    const animDuration = duration ? duration : 500;
    const animDelay = delay ? delay : getRandom(200) + Number(animSync);

    if (entry.isIntersecting) {
      element.style.animation = `${animation} ${animDuration}ms ease ${animDelay}ms forwards`;
    } else {
      element.style.animation = 'none';
    }
  });
};

const animationObserver = new IntersectionObserver(observerFunction);

elements.forEach((element) => {
  animationObserver.observe(element);
});

// Intersection Observer for skills ---------------------------------------------------------------
const skillsSection = document.getElementById('skills');

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((section) => {
      const tabs = Array.from(document.getElementsByClassName('body'));
      const topNotch = document.querySelector('.notch.top img');
      const bottomNotch = document.querySelector('.notch.bottom img');
      const skills = Array.from(document.querySelectorAll('.skill'));

      if (section.isIntersecting) {
        tabs.forEach((tab) => {
          topNotch.style.animation = 'notch-top-open 500ms 100ms forwards';
          bottomNotch.style.animation = 'notch-bottom-open 500ms 100ms forwards';
          tab.style.animation = 'skills-reveal 500ms 600ms forwards';

          skills.forEach((skill) => {
            skill.style.animation = `scale-in 500ms ease ${600 + getRandom(200)}ms forwards`;
          });
        });
      } else {
        tabs.forEach((tab) => {
          topNotch.style.animation = 'none';
          bottomNotch.style.animation = 'none';
          tab.style.animation = 'skills-hide 500ms forwards';

          skills.forEach((skill) => {
            skill.style.animation = 'none';
          });
        });
      }
    });
  },
  { threshold: 0.3 }
);

skillsObserver.observe(skillsSection);

// Intersection Observer for navbar ---------------------------------------------------------------
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
