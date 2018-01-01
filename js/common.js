
document.querySelector('#add-button').addEventListener('click', e => {

  const inputEl = document.querySelector('#todo-input');
  const listEl = document.querySelector('#todo-list');
  const itemEl = document.createElement('div');


  // 리스트 추가 (빈값체크)
  if(inputEl.value !== ""){
    itemEl.classList.add('item');
    itemEl.textContent = inputEl.value;
    listEl.appendChild(itemEl);
    inputEl.value = '';
  }else{
    alert("할일을 입력해주세요.");
  }

  // 할일 완료
  itemEl.addEventListener('click', e => {
    if(itemEl.classList.contains('complete')){
    itemEl.classList.remove('complete')
    }else{
      itemEl.classList.add('complete');
    }
  });

  // 리스트 삭제버튼 추가
  const removeButtonEl = document.createElement('span');
  removeButtonEl.classList.add('btn-delete');
  itemEl.appendChild(removeButtonEl);
  removeButtonEl.textContent = 'X';
  removeButtonEl.addEventListener('click', e => {
    listEl.removeChild(itemEl);
  });

});


// 리스트 지우기



