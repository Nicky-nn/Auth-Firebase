const c = console.log;
const d = document;
const auth = firebase.auth();

const linkOut = d.querySelectorAll('.logged-out')
const linkIn = d.querySelectorAll('.logged-in')
const loginCheck = user => {
    if(user){
        linkIn.forEach(link => link.style.display = 'block');
        linkOut.forEach(link => link.style.display = 'none');
    }
    else{
        linkOut.forEach(link => link.style.display = 'block');
        linkIn.forEach(link => link.style.display = 'none');
    }
}

// Regustarr Usuario
const signupForm = d.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = d.querySelector("#signup-email").value;
    const password = d.querySelector("#signup-password").value;

    auth.createUserWithEmailAndPassword(email, password).then(
        (userCredential) => {
            signupForm.reset(); //Reseteamos input
            $("#signupModal").modal("hide"); //Bootstrap el modal ocultamos
            c("Logueado");
        }
    );
});

// Login Usuario

const signinForm = d.querySelector("#login-form");
signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = d.querySelector("#login-email").value;
    const password = d.querySelector("#login-password").value;

    auth.signInWithEmailAndPassword(email, password).then(
        (userCredential) => {
        signinForm.reset(); //Reseteamos input
        $("#signinModal").modal("hide"); //Bootstrap el modal ocultamos
        $("#navbarNav").collapse('hide');        
        c("Logueado");
    });
});

//Logout

const logout = d.querySelector('#logout')
logout.addEventListener('click', e=> {
    e.preventDefault();
    auth.signOut().then(() => {
        $("#navbarNav").collapse('hide');        
        c('Saliendo');
    })
})


// Publicaciones
const postList = d.querySelector('.posts')
const setupPost = data => {
    if(data.length){
        let html = '';
        data.forEach(doc => {
            const post =  doc.data()
            const li = `
                <li class= "list-group-item list-group-item-action">
                    <h5>${post.title}</h5>
                    <p>${post.description}</p>
                </li>
            `
            html += li;
        })
        postList.innerHTML = html;
    }
    else{
        // postList.innerHTML = `<h5 class= "list-group-item list-group-item-action">Necesitas Entrar con tu Correo </h5>`
        postList.innerHTML = `<h class= "list-group-item list-group-item-action">Necesitas Entrar con tu Correo </h>`
    }
}
//Google Login

const google = d.querySelector('#googleLogin')
google.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
        c('Logueado con Google')
        signinForm.reset(); //Reseteamos input
        $("#signinModal").modal("hide"); //Bootstrap el modal ocultamos
        $("#navbarNav").collapse('hide');  
    })
    .catch(err => {
        c(err)
    })
})

//Facebook Login
const facebook = d.querySelector('#faceLogin')
facebook.addEventListener('click', e =>{
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
    .then(result => {
        c('Logueado con Facebook')
        signinForm.reset(); //Reseteamos input
        $("#signinModal").modal("hide"); //Bootstrap el modal ocultamos
        $("#navbarNav").collapse('hide');  
    })
    .catch(err => {
        c(err)
    })
})





//Eventos
auth.onAuthStateChanged(user => { //Comprobar si esta logueado
    if(user){
        fs.collection('posts')
            .get()
            .then((snapshot) => {
                setupPost(snapshot.docs)
                loginCheck(user);
            })
    }
    else{
        c('Sin loguear')
        //postList.innerHTML = `<h5 class= "list-group-item list-group-item-action">Necesitas Entrar con tu Correo </h5>`
        setupPost([]);
        loginCheck(user);
    }
})

