const track = document.querySelector('.carousel-track');
const carousel_images = Array.from(track.children);
const rightButton = document.querySelector('.carousel-right');
const leftButton = document.querySelector('.carousel-left');
const carousel_locator_buttons = document.querySelector('.carousel-navigator');
const indicator_buttons = Array.from(carousel_locator_buttons.children);
const image_size = carousel_images[0].getBoundingClientRect();
const image_width = image_size.width;


// carousel_images[0].style.left = 0;
// carousel_images[1].style.left = image_width + 'px';
// carousel_images[2].style.left = (image_width*2) + 'px';

// for loop to set the slide position for each slide in the carousel where index is like 'int i = 0;...;i++' and image an element in the array carousel_images
carousel_images.forEach((image,index) => {
    image.style.left = image_width * index + 'px';
})

const indictator_change = (current_indicator, target_button) =>{
    current_indicator.classList.remove('current-image');
    target_button.classList.add('current-image');
}

const imageMover = (track, current_image, target_image) =>{
    track.style.transform = 'translateX(-' + target_image.style.left + ')'; 
    current_image.classList.remove('current-slide');
    target_image.classList.add('current-slide');
}

//moving the image to the right
rightButton.addEventListener('click', e => {
    const current_image = track.querySelector('.current-slide');//getting the image the user is currently on
    //const next_image = current_image.nextElementSibling;//calling the next image in the carousel
    const current_indicator = carousel_locator_buttons.querySelector('.current-image');
    //const next_indicator = current_indicator.nextElementSibling;
    //const move = next_image.style.left; //the amount of pixels we shift the carousel by to create the illusion of movement

    if(current_image === carousel_images[carousel_images.length - 1]){
        const firstElem = carousel_images[0];//this is holding the last element of the array
        const first_indicator = indicator_buttons[0]; 
        imageMover(track, current_image, firstElem);
        indictator_change(current_indicator,first_indicator);
    }
    else{
        const next_image = current_image.nextElementSibling;//calling the next image in the carousel
        const next_indicator = current_indicator.nextElementSibling;
        imageMover(track, current_image, next_image);
        indictator_change(current_indicator,next_indicator);
    }
    
})

//moving the image to the left
leftButton.addEventListener('click' , e => {
    const current_image = track.querySelector('.current-slide');//getting the image the user is currently on
    //const previous_image = current_image.previousElementSibling;//calling the previous image in the carousel
    const current_indicator = carousel_locator_buttons.querySelector('.current-image');
    //const previous_indicator = current_indicator.previousElementSibling;

    if(current_image === carousel_images[0] ){
        const lastElem = carousel_images[carousel_images.length - 1];//this is holding the last element of the array
        const last_indicator = indicator_buttons[indicator_buttons.length - 1]; 
        imageMover(track, current_image, lastElem);
        indictator_change(current_indicator,last_indicator);
    }
    else{
        const previous_image = current_image.previousElementSibling;//calling the previous image in the carousel
        const previous_indicator = current_indicator.previousElementSibling;
        imageMover(track, current_image, previous_image);
        indictator_change(current_indicator,previous_indicator);
    }
    //console.log(carousel_images[carousel_images.length -1]);
    
})

carousel_locator_buttons.addEventListener('click', e => {

    const target_button = e.target.closest('button'); //ensuring the function only runs when the track buttons are clicked
    // to be more accurate this line records whether or not the button was clicked

    if(!target_button) return; //this is the if statement that stops the code from continuing if the user didn't click the button

    const current_image = track.querySelector('.current-slide');//getting the image the user is currently on
    const current_indicator = carousel_locator_buttons.querySelector('.current-image');//checking what button we're on
    const target_number = indicator_buttons.findIndex(button => button === target_button);
    const target_image = carousel_images[target_number];

    imageMover(track, current_image, target_image);

    indictator_change(current_indicator,target_button);
})
