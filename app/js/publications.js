document.addEventListener("DOMContentLoaded", function() {

    
    loadPublications()

})

function loadPublications() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            generatePublicationList(JSON.parse(this.response))
        }
    };
    xhttp.open("GET", "https://my-json-server.typicode.com/TomaszJaworski/test-api/news", true);
    xhttp.send();
}

function generatePublicationList(list) {
    const leftColumn = document.querySelector('#publications-left-column')
    const rightColumn = document.querySelector('#publications-right-column')
    let leftColumnContent = '';
    let rightColumnContent = '';

    list.forEach((element, index) => {
        let date = new Date(element.date)
        let parsedDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()} ${date.getHours()}:${date.getMinutes()}` 

        if(index % 2 == 0) {
            leftColumnContent += generatePublicationHTML(element, index, parsedDate)
        } else {
            rightColumnContent += generatePublicationHTML(element, index, parsedDate)
        }
        leftColumn.innerHTML = leftColumnContent;
        rightColumn.innerHTML = rightColumnContent;
    });
}

function generatePublicationHTML(element, index, parsedDate){
    return `
    <article>
        <div class="publications__release-header">
            <svg class="publications__release-commas-icon">
                <use xlink:href="dist/svg/svg.svg#comas" ></use>
            </svg>
            <h2 class="publications__release-title ${(index == 0 || index == 1) ? 'mb-4' : ''}">${element.title}</h2>

        </div>
        <p class="publications__release-date">Data dodania <time>${parsedDate}</time>.</p>

        <img class="publications__teaser" src="${element.image}" alt="${element.title} zajawka">

        <p>${element.text}</p>
    </article>`
}