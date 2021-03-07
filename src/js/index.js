// Picture's click interaction
const salutations = ['Hello!', 'Hi!', 'Hey!', "What's up!?"];
let helloTimeOut;

const heroPic = document.getElementsByClassName('hero-picture')[0];

heroPic.addEventListener('click', () => {
  const helloElement = document.getElementsByClassName('hello')[0];
  helloElement.innerHTML = salutations[Math.floor(Math.random() * 4)];
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

    if (entry.isIntersecting) {
      element.style.animation = `${element.dataset.animation} 500ms forwards`;
    } else {
      element.style.animation = 'none';
    }
  });
};

const observer = new IntersectionObserver(observerFunction);

elements.forEach((element) => {
  observer.observe(element);
});
