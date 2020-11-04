document.addEventListener("DOMContentLoaded", function() {
    const publicationsContainer = document.querySelector('#publications-to-paste');
    const loaderContainer = document.querySelector('.publications__loader');
    const loaderButton = document.querySelector('.publications__load-more');
    
    publicationsInitialLoad(publicationsContainer, loaderContainer)

    loaderButton.addEventListener('click', ()=> {
        publicationsNextLoad(publicationsContainer, loaderContainer)
    })

})

function publicationsInitialLoad(publicationsContainer, loaderContainer) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const publicationList = JSON.parse(this.response)

            let initialPublicationsContainer = `
                <div class="row px-1">
                    <div class="col-12 col-md-6" id="publications-left-column">
                        ${generatePublicationHTML(publicationList[0], 0)}
                        ${generatePublicationHTML(publicationList[2], 2)}
                    </div>
                    <div class="col-12 col-md-6" id="publications-right-column">
                        ${generatePublicationHTML(publicationList[1], 1)}
                    </div>
                </div>
                <div class="row px-1">
                    <div class="col-12 col-md-6" id="publications-left-column">
                        ${generatePublicationHTML(publicationList[3], 3)}
                    </div>
                    <div class="col-12 col-md-6" id="publications-right-column">
                        ${generatePublicationHTML(publicationList[4], 4)}
                    </div>
                </div>`

            publicationsContainer.insertAdjacentHTML('beforeend', initialPublicationsContainer);

            loaderContainer.classList.add('d-none')
        }
    };
    xhttp.open("GET", "https://my-json-server.typicode.com/TomaszJaworski/test-api/news", true);
    xhttp.send();
}

function publicationsNextLoad(publicationsContainer, loaderContainer) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 1){
            loaderContainer.classList.remove('d-none')
        }
        
        if (this.readyState == 4 && this.status == 200) {
            let loadedPublications = publicationsContainer.querySelectorAll('.publications__release').length
            const publicationList = JSON.parse(this.response)

            let nextPublicationsContainer = `
                <div class="row px-1">
                    <div class="col-12 col-md-6" id="publications-left-column">
                        ${generatePublicationHTML(publicationList[loadedPublications], loadedPublications)}
                    </div>
                    <div class="col-12 col-md-6" id="publications-right-column">
                        ${generatePublicationHTML(publicationList[loadedPublications + 1], loadedPublications + 1)}
                    </div>
                </div>`;
            
            publicationsContainer.insertAdjacentHTML('beforeend', nextPublicationsContainer);
            
            loaderContainer.classList.add('d-none')

            if(publicationList.length === loadedPublications + 2) {
                document.querySelector('.publications__load-more').classList.add('d-none')
            }
        }
    };
    xhttp.open("GET", "https://my-json-server.typicode.com/TomaszJaworski/test-api/news", true);
    xhttp.send();
}

function generatePublicationHTML(element, index){
    let date = new Date(element.date)
    let parsedDate = `${date.getFullYear()}.${("0" + (date.getMonth() + 1)).slice(-2)}.${("0" + date.getDay()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}` 
    
    return `
    <article class="publications__release">
        <div class="publications__release-header">
            <img src="dist/images/comas.svg" class="publications__release-commas-icon" alt="ikona">
            <h2 class="publications__release-title ${(index == 0 || index == 1) ? 'mb-2 mb-md-4' : ''}">
                ${element.title}
            </h2>
        </div>
        <p class="publications__release-date">Data dodania <time>${parsedDate}</time>.</p>
        <img class="publications__release-teaser ${index == 1 ? 'publications__release-teaser--big' : ''}" src="${element.image}" alt="${element.title} zajawka"/>
        <p class="publications__release-content">${element.text}</p>
    </article>`
}