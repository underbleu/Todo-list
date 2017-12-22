document.querySelector('#add-button').addEventListener('click', e => {
  const inputEl = document.querySelector('#todo-input');
  const listEl = document.querySelector('#todo-list');
  const itemEl = document.createElement('div');

  itemEl.textContent = inputEl.value;
  listEl.appendChild(itemEl);
  inputEl.value = '';
})
