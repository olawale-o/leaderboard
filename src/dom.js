const createScore = ({ score, user }) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const spanName = document.createElement('span');
  spanName.textContent = user;
  const spanCol = document.createElement('span');
  spanCol.textContent = ': ';
  const spanScore = document.createElement('span');
  spanScore.textContent = score;
  div.append(spanName, spanCol, spanScore);
  li.append(div);
  return li;
};

const updateDomWithScores = (target, scores) => {
  target.innerHTML = '';
  scores.forEach((score) => {
    target.appendChild(createScore(score));
  });
};

export default updateDomWithScores;