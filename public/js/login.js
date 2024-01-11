
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    // get the form data
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    // send the get request to the server
    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })
        .then(res => {
            if (res.status === 200) {
                window.location.href = '/'
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log('failed to fetch with error: ', err);
        })
})