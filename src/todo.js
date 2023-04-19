const onClickAdd = () => {
  const inputText = document.getElementById('add-text').value;
  document.getElementById('add-text').value = '';

  createIncompleteList(inputText);
};

const deleteFromIncompleteList = (target) => {
  document.getElementById('incomplete-list').removeChild(target);
}

const createIncompleteList = (text) => {
  const li = document.createElement('li');

  const div = document.createElement('div');
  div.className = 'list-row';

  const p = document.createElement('p');
  p.innerText = text;

  const completeButton = document.createElement('button');
  completeButton.innerText = '完了';
  completeButton.addEventListener('click', () => {
    deleteFromIncompleteList(completeButton.closest('li'));
    const addTarget = completeButton.closest('li');
    const text = addTarget.querySelector('.list-row p').innerText;
    clearRow(addTarget.querySelector('.list-row'));

    const p = document.createElement('p');
    p.innerText = text;

    const backButton = document.createElement('button');
    backButton.innerText = '戻す';
    backButton.addEventListener('click', () => {
      const deleteTarget = backButton.closest('li');
      document.getElementById('complete-list').removeChild(deleteTarget);

      const text = deleteTarget.querySelector('.list-row p').innerText;
      createIncompleteList(text);
    });

    addTarget.querySelector('.list-row').appendChild(p);
    addTarget.querySelector('.list-row').appendChild(backButton);

    document.getElementById('complete-list').appendChild(addTarget);
  });

  function clearRow(row) {
    const textInput = row.querySelector('input[type=text]');
    if (textInput) {
      textInput.value = ''; // テキスト入力フィールドをクリア
    } else {
      const elements = row.querySelectorAll('.list-row > *');
      elements.forEach((elem) => {
        elem.remove(); // list-row以下のすべての要素を削除
      });
    }
  }

  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';
  deleteButton.addEventListener('click', () => {
    deleteFromIncompleteList(deleteButton.closest('li'));
  });

  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  document.getElementById('incomplete-list').appendChild(li);
};

document
  .getElementById('add-button')
  .addEventListener("click", () => onClickAdd());