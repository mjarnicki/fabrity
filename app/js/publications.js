document.addEventListener("DOMContentLoaded", function() {

    
    loadPublications()

})

function loadPublications() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            initialPublicationList(JSON.parse(this.response))
        }
    };
    xhttp.open("GET", "https://my-json-server.typicode.com/TomaszJaworski/test-api/news", true);
    xhttp.send();
}

function initialPublicationList(list) {
    const publicationsContainer = document.querySelector('.publications__container')
    
    let initialPublicationsContainer = `
    <div class="row">
        <div class="col-12 col-md-6" id="publications-left-column">
            ${generatePublicationHTML(list[0], 0)}
            ${generatePublicationHTML(list[2], 2)}
        </div>
        <div class="col-12 col-md-6" id="publications-right-column">
            ${generatePublicationHTML(list[1], 1)}
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6" id="publications-left-column">
            ${generatePublicationHTML(list[3], 3)}
        </div>
        <div class="col-12 col-md-6" id="publications-right-column">
            ${generatePublicationHTML(list[4], 4)}
        </div>
    </div>`

    publicationsContainer.insertAdjacentHTML('beforeend', initialPublicationsContainer);
}

function generatePublicationHTML(element, index){
    let date = new Date(element.date)
    let parsedDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ${date.getHours()}:${date.getMinutes()}` 
    
    return `
    <article>
        <div class="publications__release-header">
            <svg class="publications__release-commas-icon">
                    <path d="M2.71227 21.1467C0.978989 19.3689 0.0484009 17.375 0.0484009 14.1429C0.0484009 8.4554 4.18304 3.35778 10.1957 0.837402L11.6984 3.07665C6.08629 6.00815 4.9891 9.81228 4.55157 12.2108C5.45524 11.759 6.63824 11.6014 7.79769 11.7054C10.8335 11.9768 13.2264 14.3834 13.2264 17.375C13.2264 18.8834 12.6059 20.3301 11.5013 21.3967C10.3968 22.4633 8.89868 23.0625 7.3366 23.0625C6.47275 23.0552 5.61903 22.8821 4.82513 22.5532C4.03123 22.2243 3.31301 21.7461 2.71227 21.1467V21.1467ZM19.5403 21.1467C17.807 19.3689 16.8764 17.375 16.8764 14.1429C16.8764 8.4554 21.011 3.35778 27.0237 0.837402L28.5264 3.07665C22.9143 6.00815 21.8171 9.81228 21.3796 12.2108C22.2832 11.759 23.4662 11.6014 24.6257 11.7054C27.6615 11.9768 30.0544 14.3834 30.0544 17.375C30.0544 18.8834 29.4339 20.3301 28.3293 21.3967C27.2248 22.4633 25.7267 23.0625 24.1646 23.0625C23.3007 23.0552 22.447 22.8821 21.6531 22.5532C20.8592 22.2243 20.141 21.7461 19.5403 21.1467V21.1467Z" fill="#272727"/>
            </svg>
            <h2 class="publications__release-title ${(index == 0 || index == 1) ? 'mb-4' : ''}">${element.title} ${index}</h2>

        </div>
        <p class="publications__release-date">Data dodania <time>${parsedDate}</time>.</p>

        <img class="publications__teaser ${index == 1 ? 'publications__teaser--big' : ''}" src="${element.image}" alt="${element.title} zajawka"/>

        <p>${element.text}</p>
    </article>`
}