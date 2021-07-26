import { post, get } from './api.js';

const BASE_URI = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export const parseResponse = (result) => {
  const resultStr = result.split(':');
  const [, secondPart] = resultStr;
  const trimmedText = secondPart.trim();
  const endIndex = trimmedText.indexOf(' ');
  return trimmedText.substring(0, endIndex);
};

export const createGame = async (name) => {
  const ENDPOINT = 'games/';
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await post(URI, name);
  return response.json();
};

export const fetchScore = async ({ data, gameId }) => {
  const GAMES_BASE_URI = `${BASE_URI}games/`;
  const ENDPOINT = 'scores/';
  const URI = `${GAMES_BASE_URI}${gameId}/${ENDPOINT}`;
  const response = await post(URI, data);
  return response.json();
};

export const refreshScore = async (gameId) => {
  const GAMES_BASE_URI = `${BASE_URI}games/`;
  const ENDPOINT = 'scores/';
  const URI = `${GAMES_BASE_URI}${gameId}/${ENDPOINT}`;
  const response = await get(URI);
  return response.json();
};
