console.log('signup.js is connected to signup.html');


const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', event => {
    console.log('signup form submitted');
    event.preventDefault();

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData); // we get an object from the form data, we can directoly get whole form data as an object but we need to convert it to an object first

    // send the post request to the server
    fetch('/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name, userName: data.userName, email: data.email, password: data.password
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log('failed to fetch with error: ', err);
        })
});