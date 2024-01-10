console.log('script file connected successfully');


const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(typeof data.url);

  if(!data.url){
    alert('please enter a url');
    return;
  }

  console.log('continue to fetch');
  fetch('/api/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: data.url })
  }).then(res => res.json())
  .then(data => {
    console.log(data);
    addDataToUi(data);
  })
  .catch(err => {
    console.log('failed to fetch with error: ', err);
  });
});

function addDataToUi(data) {
  if(!data.shortUrl){
    alert('failed to create short url');
    return;
  }

  const url = document.querySelector('.url');
  console.log(data.shortUrl);

  url.innerHTML = data.shortUrl;
}