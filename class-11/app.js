'use strict';
var arrayOfImageName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var arrayOfImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var imageProdect = [];

var leftImage = document.getElementById('left_image');
var centerImage = document.getElementById('center_image');
var rightImage = document.getElementById('right_image');

var leftText = document.getElementById('left_image_text');
var centerText = document.getElementById('center_image_text');
var rightText = document.getElementById('right_image_text');

var allSection = document.getElementById('all_image');

var trialsleft = 25;

function AllImage(name, image) {
    this.name = name;
    this.image = image;
    this.url = 'image/' + image;
    this.conter = 0;
    imageProdect.push(this);

}
function objectImage() {
    for (let index = 0; index < 19; index++) {
        new AllImage(arrayOfImageName[index], arrayOfImage[index]);
    }
}
function renderImage(firstImage, secondImage, thardImage) {
    leftImage.setAttribute('src', imageProdect[firstImage].url);
    centerImage.setAttribute('src', imageProdect[secondImage].url);
    rightImage.setAttribute('src', imageProdect[thardImage].url);

    leftText.textContent = imageProdect[firstImage].name;
    centerText.textContent = imageProdect[secondImage].name;
    rightText.textContent = imageProdect[thardImage].name;

}

function pickAImage() {
    var firstImage = Math.round(Math.random() * (imageProdect.length - 1))
    var secondImage = Math.round(Math.random() * (imageProdect.length - 1))
    var thardImage = Math.round(Math.random() * (imageProdect.length - 1))

    do {
        secondImage = Math.round(Math.random() * (imageProdect.length - 1))
        } while (secondImage === thardImage||secondImage === firstImage);

    do {
        thardImage = Math.round(Math.random() * (imageProdect.length - 1))
    } while (thardImage === firstImage||thardImage === secondImage);

    renderImage(firstImage, secondImage, thardImage);
}

 function checkImage(objectIndicator){
    for (var index = 0; index < imageProdect.length; index++) {
        if (imageProdect[index].url === objectIndicator) {
            imageProdect[index].conter++;
            trialsleft--;
        }
    }
}

function countImage(event) {
    var targetId = event.target.id;
    if (trialsleft !== 0) {
        if (targetId === 'left_image' || targetId === 'center_image' || targetId === 'right_image') {
            var objectIndicator = event.target.getAttribute('src');
            checkImage(objectIndicator);
            pickAImage();

        }
    } else{
     allSection.removeEventListener('click',countImage);

    }
}

objectImage();
pickAImage();
console.log(imageProdect);

allSection.addEventListener('click', countImage);
// viewResult.addEventListener('drag', result);
