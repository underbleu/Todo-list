const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth(); // Get the Auth service 
const storage = firebase.storage();
const loginButtonEl = document.querySelector('.btn-login');
const fileInputEl = document.querySelector('.file-input');

// 로그인 버튼을 눌렀을때
loginButtonEl.addEventListener('click', async e => {
    const result = await auth.signInWithPopup(provider);
    console.log(result);
})

// 파일업로드
fileInputEl.addEventListener('change', async e => {
    console.log(fileInputEl.files);
    for(let i = 0; i < fileInputEl.files.length; i++){
        const refStr = `/images/${auth.currentUser.uid}:${new Date().getTime()}`;
        const snapshot = await storage.ref(refStr).put(fileInputEl.files[i]);
        const imageEl = document.createElement('img');
        imageEl.src = snapshot.downloadURL;
        document.body.appendChild(imageEl);
    }

})


