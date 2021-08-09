'use strict';

const show = document.getElementById('show');
const hide = document.getElementById('hide');
const addContainer = document.getElementById('add-container');
const cardsContainer = document.getElementById('cards-container');
const addCard = document.getElementById('add-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const current = document.getElementById('current');
const clear = document.getElementById('clear');

let userData = localStorage.getItem('cards')
  ? JSON.parse(localStorage.getItem('cards'))
  : [];
let currentIndex = 0;

const toggleClass = () => {
  addContainer.classList.toggle('show');
};

const displayUI = (datas, index) => {
  cardsContainer.innerHTML = '';
  datas.forEach((data, ind) => {
    cardsContainer.innerHTML += `
		<div class="card ${ind === index ? 'active' : ''}">
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${data.q}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${data.a}
            </p>
          </div>
        </div>
      </div>
		`;
  });
};

const filpCard = (e) => {
  const target = e.target;
  target.closest('.card').classList.toggle('show-answer');
};

const addCardFn = () => {
  const q = question.value.trim();
  const a = answer.value.trim();

  if (!q || !a) return alert('Pls fill all fields');

  userData.push({
    q,
    a,
  });

  localStorage.setItem('cards', JSON.stringify(userData));

  displayUI(userData, currentIndex);
  slideIndex(currentIndex + 1, userData.length);
  toggleClass();

  question.value = answer.value = '';
};

const slideIndex = (index, total) => {
  current.textContent = `${index}/${total}`;
};

const changeCards = (index) => {
  const total = cardsContainer.querySelectorAll('.card');

  total.forEach((el, ind) => {
    if (ind + 1 === index) el.classList.add('active');
    else el.classList.remove('active');
  });
};

const activeSlide = (e) => {
  if (userData.length > 0) {
    const total = cardsContainer.querySelectorAll('.card').length;

    if (e.target.closest('#next')) +currentIndex++;
    if (e.target.closest('#prev')) +currentIndex--;

    if (currentIndex >= total) currentIndex = total - 1;
    if (currentIndex <= 0) currentIndex = 0;

    slideIndex(currentIndex + 1, total);
    changeCards(currentIndex + 1);
  }
};

const clearCards = () => {
  localStorage.removeItem('cards');
  userData = [];

  displayUI(userData, 0);
  slideIndex(0, 0);
};

//////////////////
displayUI(userData, 0);
slideIndex(userData.length > 0 ? 1 : 0, userData.length);

show.addEventListener('click', toggleClass);
hide.addEventListener('click', toggleClass);
addCard.addEventListener('click', addCardFn);
cardsContainer.addEventListener('click', filpCard);
next.addEventListener('click', activeSlide);
prev.addEventListener('click', activeSlide);
clear.addEventListener('click', clearCards);
