import './stylesheets/style.css';
import {
  parseResponse, fetchScore, refreshScore, createGame,
} from './utils.js';
import updateDomWithScores from './dom.js';

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
  const scoreList = document.getElementById('scores-list');

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
    updateDomWithScores(scoreList, result);
    user.focus();
  });

  refreshButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const { result } = await refreshScore(gameId);
    updateDomWithScores(scoreList, result);
  });
});