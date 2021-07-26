import './stylesheets/style.css';

const BASE_URI = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const parseResponse = (result) => {
  const resultStr = result.split(':');
  const [, secondPart] = resultStr;
  const trimmedText = secondPart.trim();
  const endIndex = trimmedText.indexOf(' ');
  return trimmedText.substring(0, endIndex);
};

const createGame = async (name) => {
  const ENDPOINT = 'games/';
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await fetch(URI, {
    method: 'POST',
    body: JSON.stringify(name),
    headers: {
      'Content-type': 'application/json; Charset=UTF-8',
    },
  });
  return response.json();
};

const fetchScore = async ({ data, gameId }) => {
  const GAMES_BASE_URI = `${BASE_URI}games/`;
  const ENDPOINT = 'scores/';
  const URI = `${GAMES_BASE_URI}${gameId}/${ENDPOINT}`;
  const response = await fetch(URI, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; Charset=UTF-8',
    },
  });
  return response.json();
};

const refreshScore = async (gameId) => {
  const GAMES_BASE_URI = `${BASE_URI}games/`;
  const ENDPOINT = 'scores/';
  const URI = `${GAMES_BASE_URI}${gameId}/${ENDPOINT}`;
  const response = await fetch(URI);
  return response.json();
};

const createScore = ({ score, user }) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const spanName = document.createElement('span');
  spanName.textContent = user;
  const spanCol = document.createElement('span');
  spanCol.textContent = ' : ';
  const spanScore = document.createElement('span');
  spanScore.textContent = score;
  div.append(spanName, spanCol, spanScore);
  li.append(div);
  return li;
};

const updateDomWithScores = (scores) => {
  const scoreList = document.getElementById('scores-list');
  scoreList.innerHTML = '';
  scores.forEach((score) => {
    scoreList.appendChild(createScore(score));
  });
};

window.addEventListener('DOMContentLoaded', async () => {
  const GAMESNAME = {
    name: 'wale-leaderboard-microverse',
  };
  const { result } = await createGame(GAMESNAME);
  const gameId = parseResponse(result);

  const addButton = document.getElementById('add-score');
  const refreshButton = document.getElementById('refresh-score');
  const user = document.getElementById('your-name');
  const score = document.getElementById('your-score');

  addButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const data = {
      user: user.value.trim(),
      score: score.value.trim(),
    };
    const postData = {
      data,
      gameId,
    };
    await fetchScore(postData);
    user.value = '';
    score.value = '';
    const { result } = await refreshScore(gameId);
    updateDomWithScores(result);
  });

  refreshButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const { result } = await refreshScore(gameId);
    updateDomWithScores(result);
  });
});