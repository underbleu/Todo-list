// Google 제공업체 개체의 인스턴스를 생성
var provider = new firebase.auth.GoogleAuthProvider();

document.querySelector('.btn-login').addEventListener('click', async e => {
    // 로그인 팝업 -> 로그인 -> result의 token과 user-info 사용가능
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    const token = result.credential.accessToken;
    const user = result.user;

    // 로그인 완료후, Todo-list띄우기
    document.querySelector('.wrapper').classList.remove('invisible');
    document.querySelector('.btn-login').classList.add('invisible');
})


document.querySelector('.todo-input').addEventListener('keypress', async e => { // keydown -> keypress : 한글입력시 목록 2개생기는 버그 해결
  if(e.key === 'Enter' && e.currentTarget.value !== ""){
    const listEl = document.querySelector('.todo-list'); // 비동기 작업(await)전에 loadingIndicator 넣어줘야 엔터와 동시에 목록생성 가능
    listEl.classList.add('todo-list--loading');

    const uid = firebase.auth().currentUser.uid; // uid : 사용자를 구별할 수 있는 식별자

    // 비동기 작업이 일어나는 순서를 고려한 설계
    // 새 목록 push가 완료된후(await) -> refreshTodos();
    // await가 아니라면 refreshTodos(); 후에 새로운 목록이 추가되므로, 화면이 제대로 그려지지 않는다
    await firebase.database().ref(`users/${uid}/todos`).push({
      title: e.currentTarget.value, //.value -> .textContent : input창 div(contenteditable)로 만든경우
      complete: false
    })
    refreshTodos();
    // 목록생성후 input 비워주기
    e.currentTarget.value = "";
  }
})

// user에 저장되있던 todo목록 불러오기
async function refreshTodos(){
  const listEl = document.querySelector('.todo-list');
  listEl.classList.add('todo-list--loading');

  const uid = firebase.auth().currentUser.uid;
  const snapshot  = await firebase.database().ref(`/users/${uid}/todos`).once('value'); //on 변경있을때마다 실시간, once 한꺼번에
  const todos = snapshot.val(); // todo-list 아이템들

  // todos를 순회하면서 list를 모두 appendChild하여 목록생성
  for(let [todoId, todo] of Object.entries(todos)){ // Object.entries(): 객체의 key + value를 배열로 반환
    const itemEl = document.createElement('div');
    itemEl.textContent = todo.title;
    itemEl.classList.add('item');
    listEl.appendChild(itemEl);
  }
  listEl.classList.remove('todo-list--loading');
}


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User가 로그인 되어있다면 -> 저장되있는 todo-list 출력
    refreshTodos();

  } else {
    // User is signed out.

  }
})

// 내코드 (Firebase인증 삽입전)
// document.querySelector('#add-button').addEventListener('click', e => {

//   const inputEl = document.querySelector('#todo-input');
//   const listEl = document.querySelector('#todo-list');
//   const itemEl = document.createElement('div');


//   // 리스트 추가 (빈값체크)
//   if(inputEl.value !== ""){
//     itemEl.classList.add('item');
//     itemEl.textContent = inputEl.value;
//     listEl.appendChild(itemEl);
//     inputEl.value = '';
//   }else{
//     alert("할일을 입력해주세요.");
//   }

//   // 할일 완료
//   itemEl.addEventListener('click', e => {
//     if(itemEl.classList.contains('complete')){
//     itemEl.classList.remove('complete')
//     }else{
//       itemEl.classList.add('complete');
//     }
//   });

//   // 리스트 삭제버튼 추가
//   const removeButtonEl = document.createElement('span');
//   removeButtonEl.classList.add('btn-delete');
//   itemEl.appendChild(removeButtonEl);
//   removeButtonEl.textContent = 'X';
//   removeButtonEl.addEventListener('click', e => {
//     listEl.removeChild(itemEl);
//   });

// });




