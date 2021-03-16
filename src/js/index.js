// Utilities
function getRandom(range) {
  return Math.floor(Math.random() * range);
}

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
      element.style.animation = `${animation} 500ms ease ${getRandom(
        200
      )}ms forwards`;
    } else {
      element.style.animation = 'none';
    }
  });
};

const observer = new IntersectionObserver(observerFunction);

elements.forEach((element) => {
  observer.observe(element);
});
