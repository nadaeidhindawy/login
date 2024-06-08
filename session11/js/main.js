
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
let emails = localStorage.getItem('emails') ? JSON.parse(localStorage.getItem('emails')) : [];
let emailRegister = document.getElementById("email-regester")
let passwordLogin = document.getElementById("password-login")
let error = document.getElementById("error")
let done = document.getElementById("done")
let isLoginUser = JSON.parse(localStorage.getItem('isLoginUser'))


if (isLoginUser) {
    document.getElementById('welcome').innerHTML += ' ' + isLoginUser.name;
}

function dataError() {
    let { name, email, password } = getRegisterData();
    if (password == '' && email == '' && name == '') {
        error.classList.remove('d-none')
        error.classList.add('d-block')
        done.classList.remove('d-block')
        done.classList.add('d-none')
        return true;
    } else {
        return false;
    }
}



function register() {
    if (dataError()) {
        return;
    }
    let registerData = getRegisterData();


    if (emails.includes(registerData.email)) {
        error.classList.remove('d-none')
        error.classList.add('d-block')
        done.classList.remove('d-block')
        done.classList.add('d-none')
        return;
    } else {
        error.classList.remove('d-block')
        error.classList.add('d-none')
        done.classList.add('d-block')
        done.classList.remove('d-none');
    }


    users.push(registerData);
    emails.push(registerData.email)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("emails", JSON.stringify(emails))
    emptyInput();
}


function getRegisterData() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    return { name, email, password }
}

function emptyInput() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
}

function goTo(target) {
    location.href = target;
};

function login() {
    let emailRegister = document.getElementById('email-regester').value;
    let passwordLogin = document.getElementById('password-login').value;


    let findUser = users.find(e => e.email == emailRegister);



    if (findUser) {
        if (findUser.password === passwordLogin) {
            goTo('home.html');
            localStorage.setItem("isLoginUser", JSON.stringify(findUser))
        } else {
            error.classList.add('d-block');
            error.classList.remove('d-none');
        }
    } else {
        error.classList.add('d-block');
        error.classList.remove('d-none');
    }



}

