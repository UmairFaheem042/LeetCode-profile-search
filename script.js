const username = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');

const fetchUser = async () => {
  document.querySelector('.error__msg').style.display = 'none';
  document.querySelector('.profile__container-outer').style.display = 'none';
  document.querySelector('.loader').style.display = 'block';
  const apiUrl = `https://leetcode-stats-api.herokuapp.com/${username.value}`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  if (data.status == 'success') {
    setTimeout(() => {
      displayUser(data);
    }, 500);
  } else {
    document.querySelector('.loader').style.display = 'none';
    setTimeout(() => {
      document.querySelector('.error__msg').style.display = 'flex';
    }, 500);
  }
};

const displayUser = (user) => {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.profile__container-outer').style.display = 'flex';
  const name = document.querySelector('.username');
  const rank = document.querySelector('.rank span');
  const acceptanceRate = document.querySelector('.acceptance span');
  const totalSolved = document.getElementById('totalSolved');
  const easySolved = document.getElementById('easyAttempt');
  const mediumSolved = document.getElementById('mediumAttempt');
  const hardSoved = document.getElementById('hardAttempt');

  let total = user.totalSolved.toString().padStart(4, '0');
  let easy = user.easySolved.toString().padStart(4, '0');
  let medium = user.mediumSolved.toString().padStart(4, '0');
  let hard = user.hardSolved.toString().padStart(4, '0');

  name.textContent = username.value;
  rank.textContent = user.ranking;
  acceptanceRate.textContent = `${user.acceptanceRate}%`;
  totalSolved.textContent = total;
  easySolved.textContent = easy;
  mediumSolved.textContent = medium;
  hardSoved.textContent = hard;
};

document.querySelector('.profile__container-outer').style.display = 'none';
document.querySelector('.loader').style.display = 'none';

searchBtn.addEventListener('click', () => {
  setTimeout(() => {
    fetchUser();
  });
});

username.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    setTimeout(() => {
      fetchUser();
    }, 500);
  }
});
