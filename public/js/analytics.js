
let form = document.querySelector('.form-container');

form.addEventListener('submit', event => {
    event.preventDefault();

    let shortUrl = document.querySelector('.short-url');
    shortUrl = shortUrl.value;

    if (!shortUrl) {
        alert('please enter a url');
        return;
    }

    let shortId = getTheShortId(shortUrl);

    fetch(`/api/analytics/${shortId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res =>{
            if(res.status === 404){
                alert('url not found');
                return;
            }

            if(res.status === 401) {
                alert('you are not authorized to view this url');
                return;
            }

            if(res.redirected){
                window.location.href = '/login';
                return;
            }

            return res.json()
        })
        .then(data => {
            console.log(data);
            if(data){
                addTheUrlTrackToUi(data);
            }
        })
        .catch(err => {
            console.log('failed to fetch with error: ', err);
        })

    console.log(shortUrl);

});

function getTheShortId(shortUrl) {
    const parts = shortUrl.split('/');

    return parts[parts.length - 1];
}

function addTheUrlTrackToUi(urlTrack) {
    // console.log(urlTrack);
    // console.log(urlTrack.data);
    // console.log(urlTrack.clicksCount);
    // console.log(urlTrack.message);

    let clicks_top_head = document.querySelector('.clicks-top-head');
    clicks_top_head.innerHTML = 'clicks (' + urlTrack.clicksCount + ')';

    //remove the warning message
    let warning_container = document.querySelector('.warning-container');
    warning_container.style.display = 'none';

    const arr = urlTrack.data;
    arr.reverse();
    analytics_tbody = document.querySelector('.analytics-tbody');

    // remove all the past data from the table
    while (analytics_tbody.firstChild) {
        analytics_tbody.removeChild(analytics_tbody.firstChild);
    }

    let clickCount = urlTrack.data.length;
    arr.forEach(Element => {
        // add all data to the table
        const visitedAt = new Date(Element.visitedAt);
        const date = visitedAt.toLocaleDateString();
        const time = visitedAt.toLocaleTimeString();


        // create a tr and td
        let tr = document.createElement('tr');
        let tdClick = document.createElement('td');
        let tdDate = document.createElement('td');
        let tdTime = document.createElement('td');

        //add the data to the td
        tdClick.innerHTML = clickCount--;
        tdDate.innerHTML = date;
        tdTime.innerHTML = time;

        // add the td to the tr
        tr.appendChild(tdClick);
        tr.appendChild(tdDate);
        tr.appendChild(tdTime);

        // add the tr to the tbody
        analytics_tbody.appendChild(tr);

    });
}