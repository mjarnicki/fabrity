document.addEventListener("DOMContentLoaded", function() {

const slides = document.querySelectorAll(".slider__img");
const dotsContainer = document.querySelector(".slider__dots-container");
const toggleAutoplayButton = document.querySelector(".slider__toggle-autoplay");
generateDots(slides, dotsContainer)
const dots = document.querySelectorAll('.slider__dot')
const sliderLength = dots.length
let autoSlide = true

// initial slider launch
changeSlide(1, slides, dots);

// change slide with mouse
dotsContainer.addEventListener('click', event => {
    const dotIndex = event.target.getAttribute('index');
    if(dotIndex) changeSlide(dotIndex, slides, dots)
})

// change slide with keyboard
dotsContainer.addEventListener('keypress', event => {
    
    if(event.keyCode == 32 || event.keyCode == 13){
        const dotIndex = event.target.getAttribute('index');
        if(dotIndex) changeSlide(dotIndex, slides, dots)
    }
})

toggleAutoplayButton.addEventListener('click', event => {
    console.log('test przycisku');
    let light
    if (!autoSlide) {
        light = window.setInterval(nextSlide(slides, dots),1500);
        autoSlide = true;
    } else {
        window.clearInterval(light);
        autoSlide = false;
        light = null;
    }
})



function change() {
}

// autoplay

// setInterval( () => {

//         nextSlide(slides, dots)

//         // let activeDotIndex = document.querySelector('.slider__dot--active').getAttribute('index')-0

//         // console.log(activeDotIndex);

//         // if(sliderLength === activeDotIndex) changeSlide(1, slides, dots)
//         // else changeSlide((activeDotIndex + 1), slides, dots)
//     }, 4000);


});

function changeSlide(n, slides, dots) {

    slides.forEach((item)=> {
        item.classList.remove('slider__img--active')
    })

    dots.forEach((item)=> {
        item.classList.remove('slider__dot--active')
    })

    slides[n-1].classList.add('slider__img--active');
    dots[n-1].classList.add('slider__dot--active');
}

function generateDots(slides, dotsContainer){

    let dotList = '';

    slides.forEach((item, index)=> {

        dotList += 
        `<li tabindex="0" role="button" class="slider__dot" index="${index + 1}" 
             aria-label="zmień slajd na ${item.getAttribute('alt')}">
        </li>`
    })
    dotsContainer.innerHTML = dotList;
    
}

function nextSlide(slides, dots){
    const activeDotIndex = document.querySelector('.slider__dot--active').getAttribute('index')-0
    const sliderLength = dots.length;

    if(sliderLength === activeDotIndex) changeSlide(1, slides, dots)
    else changeSlide((activeDotIndex + 1), slides, dots)
}