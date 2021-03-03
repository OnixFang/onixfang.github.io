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
