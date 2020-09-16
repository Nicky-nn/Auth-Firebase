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
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = d.querySelector("#login-email").value;
    const password = d.querySelector("#login-password").value;

    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        signupForm.reset(); //Reseteamos input
        $("#signupModal").modal("hide"); //Bootstrap el modal ocultamos
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

