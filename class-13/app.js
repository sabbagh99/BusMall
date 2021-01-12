'use strict';
var arrayOfImageName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var arrayOfImage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var leftImage = document.getElementById('left_image');
var centerImage = document.getElementById('center_image');
var rightImage = document.getElementById('right_image');

var leftText = document.getElementById('left_image_text');
var centerText = document.getElementById('center_image_text');
var rightText = document.getElementById('right_image_text');

var allSection = document.getElementById('all_image');
var viewResult = document.getElementById('view_result')
var imageCanvas = document.getElementById('chart').getContext('2d');

var shownImages = [];
var imageProdect = [];
var trialsleft = 25;


function AllImage(name, image) {
    this.name = name;
    this.image = image;
    this.url = 'image/' + image;
    this.counter = 0;
    imageProdect.push(this);
    this.timesShown = 0;
    
}
function objectImage() {
    for (let index = 0; index < 19; index++) {
        new AllImage(arrayOfImageName[index], arrayOfImage[index]);
    }
}

function storeData() {   

    localStorage.setItem('chart', JSON.stringify(imageProdect));

}
console.log(localStorage);

function checkAndRestore() {
    
    if (localStorage.length > 0 ) { 
        imageProdect = JSON.parse(localStorage.getItem('chart')); 
        renderChart();
    }
}

function renderImage(firstImage, secondImage, thardImage) {
    leftImage.setAttribute('src', imageProdect[firstImage].url);
    centerImage.setAttribute('src', imageProdect[secondImage].url);
    rightImage.setAttribute('src', imageProdect[thardImage].url);

    leftText.textContent = imageProdect[firstImage].name;
    centerText.textContent = imageProdect[secondImage].name;
    rightText.textContent = imageProdect[thardImage].name;

    imageProdect[firstImage].timesShown++;
    imageProdect[secondImage].timesShown++;
    imageProdect[thardImage].timesShown++;
}
var arrayOfImageCount = [];
var arrayOfImageShown = [];

function countNum() {
    for (var index = 0; index < imageProdect.length; index++) {
        arrayOfImageCount.push(imageProdect[index].counter);
        arrayOfImageShown.push(imageProdect[index].timesShown);

    }
   storeData(); 
}
function renderChart() {

    var myChart = new Chart(imageCanvas, {
        type: 'bar',
        data: {
            labels: arrayOfImageName, // array of labels (names of the goats)
            datasets: [
                {
                    label: '# of image Clicks',
                    data: arrayOfImageCount, // array of values (count for each goat when it was clicked)
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Time shown for the image',
                    data: arrayOfImageShown,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function checkAvailability(selectedImageName) {
    for (var index = 0; index < shownImages.length; index++) {
        if (shownImages[index] === selectedImageName) {
            return true;
        }
    }
    return false;
}

function pickAImage() {
    var firstImage = Math.round(Math.random() * (imageProdect.length - 1))
    var secondImage = Math.round(Math.random() * (imageProdect.length - 1))
    var thardImage = Math.round(Math.random() * (imageProdect.length - 1))

    do {
        firstImage = Math.round(Math.random() * (imageProdect.length - 1))
    } while (firstImage === thardImage || secondImage === firstImage || checkAvailability(firstImage));

    do {
        secondImage = Math.round(Math.random() * (imageProdect.length - 1))
    } while (secondImage === thardImage || secondImage === firstImage || checkAvailability(secondImage));

    do {
        thardImage = Math.round(Math.random() * (imageProdect.length - 1))
    } while (thardImage === firstImage || thardImage === secondImage ||checkAvailability(thardImage));

    shownImages = [];
    shownImages.push(
        firstImage,
        secondImage,
        thardImage
    )
    // console.log(shownImages);
    renderImage(firstImage, secondImage, thardImage);
}
function checkImage(objectIndicator) {
    for (var index = 0; index < imageProdect.length; index++) {
        if (imageProdect[index].url === objectIndicator) {
            imageProdect[index].counter++;
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
    } else {
        allSection.removeEventListener('click', countImage);
    }
}
objectImage();
pickAImage();

function result(event) {
    event.preventDefault();
    var unOrderList = document.createElement('ul');
    allSection.appendChild(unOrderList);
    for (let index = 0; index < imageProdect.length; index++) {
        var list = document.createElement('li');
        list.textContent = imageProdect[index].name + ' had ' + imageProdect[index].counter + ' vots, and was seen ' + imageProdect[index].timesShown + ' times.';
        unOrderList.appendChild(list);
    }
    countNum();
    renderChart();
}

// console.log(counter);
allSection.addEventListener('click', countImage);
viewResult.addEventListener('click', result);

checkAndRestore();