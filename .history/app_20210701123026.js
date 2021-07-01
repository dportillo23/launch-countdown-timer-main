//Change 60 for 00
const sixtyToZero = num => {
    if (num == 60) {
        num = "00"
    }

    return num
} 

class Card {
    constructor(_class) {
        this.card = document.getElementById(_class);
    }

    updateTimer(_newTime) {
        console.log(this.card);
        this.card.innerHTML = sixtyToZero(_newTime);
    }

    flipCard() {
        console.log("Flip Card");
    }


}

// Constants and DOM objects
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;


// //  Timer elements
// const timeDays = document.getElementById("days");
// const timeHours = document.getElementById("hours");
// const timeMinutes = document.getElementById("minutes");
// const timeSeconds = document.getElementById("seconds");


// // Cards Elements
// const daysContainer = document.querySelector(".days");
// const hoursContainer = document.querySelector(".hours");
// const minutesContainer = document.querySelector(".minutes");
// const secondsContainer = document.querySelector(".seconds");


// Create Card Objects
const daysCard = new Card("days");
const hoursCard = new Card("hours");
const minutesCard = new Card("minutes");
const secondsCard = new Card("seconds");


// Functions
function difference(endTime, startTime) {
    return endTime - startTime;
}

function addLeadingZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}


//  Interval to make the countdown
var counter = 0
var leftTime = {
    d: [],
    h: [],
    m: [],
    s: [],
}


// Set counter final day
const finish = new Date();
finish.setDate(finish.getDate() + 14);


// Start countdown
setInterval(() => {
    const actualTime = new Date();
    const timeDifference = difference(finish, actualTime);

    if (counter === 0) {
        leftTime = {
            d: [Math.floor(timeDifference / days), Math.floor(timeDifference / days)],
            h: [Math.floor((timeDifference % days)/ hours ), Math.floor((timeDifference % days)/ hours )],
            m: [Math.floor((timeDifference % hours) / minutes), Math.floor((timeDifference % hours) / minutes)],
            s: [Math.floor((timeDifference % minutes) / seconds) + 1, Math.floor((timeDifference % minutes) / seconds) + 1],
        }

    } else {
        leftTime = {
            d: [Math.floor(timeDifference / days), leftTime.d[0]],
            h: [Math.floor((timeDifference % days)/ hours ), leftTime.h[0]],
            m: [Math.floor((timeDifference % hours) / minutes), leftTime.m[0]],
            s: [Math.floor((timeDifference % minutes) / seconds) + 1, leftTime.s[0]],
        }
    }
    

    // Add leading zero if needed
    for (const item in leftTime) {
        leftTime[item] = leftTime[item].map(num => addLeadingZero(num)) 
    }


    //  Change numbers in HTML
    secondsContainer.setAttribute("data-value", leftTime.s[0])
    daysCard.updateTimer = leftTime.d[0];
    hoursCard.updateTimer= leftTime.h[0];
    minutesCard.updateTimer = leftTime.m[0];
    secondsCard.updateTimer = leftTime.s[0];

    counter += 1

}, 500);