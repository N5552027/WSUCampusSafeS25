const wrapper = document.querySelector(".wrapper");
const loginForm = document.querySelector(".login-link");
const registerForm = document.querySelector(".register-link");

registerForm.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginForm.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});