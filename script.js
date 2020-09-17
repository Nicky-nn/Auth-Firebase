const c = console.log;
const d = document;
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
        
        c("Logueado");
    });
});

//Logout

const logout = d.querySelector('#logout')
logout.addEventListener('click', e=> {
    e.preventDefault();
    auth.signOut().then(() => {
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
        postList.innerHTML = `<h5 class= "list-group-item list-group-item-action">Necesitas Entrar con tu Correo </h5>`
    }
}
//Eventos
auth.onAuthStateChanged(user => { //Comprobar si esta logueado
    if(user){
        fs.collection('posts')
            .get()
            .then((snapshot) => {
                setupPost(snapshot.docs)
            })
    }
    else{
        c('Sin loguear')
        postList.innerHTML = `<h5 class= "list-group-item list-group-item-action">Necesitas Entrar con tu Correo </h5>`

    }
})

