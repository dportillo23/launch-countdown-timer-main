// Constants
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

// Keyframes
// const topKeyFrame = [
//     {transform:  "rotateX(0deg)", zIndex: 2},
//     {opacity: 0.99, offset: 0.01},
//     {opacity: 0.99, offset: 0.99},
//     {transform: "rotateX(-90deg)"}
// ];

// const topKeyOptions = {
//     duration: 300,
//     iterations: 1,
//     easing: "cubic-beizer(.15, .45, .28, 1)",
//     fill:  "both",
//     queue: false,
// }

// const bottomKeyFrame = [
//     {transform:  "rotateX(90deg)", zIndex: -1, opacity: 0},
//     {transform:  "rotateX(90deg)", zIndex: -1, opacity: 0, offset: 0.50},
//     {opacity: 0.99, offset: 0.51},
//     {transform: "rotateX(0deg)", zIndex: 5}
// ];

// const bottomKeyOptions = {
//     duration: 600,
//     iterations: 1,
//     easing: "cubic-beizer(.15, .45, .28, 1)",
//     fill:  "both",
//     queue: false,
// }


// Functions
// Function to make the difference between end and actual time
function difference(endTime, startTime) {
    return endTime - startTime;
}

//Change 60 for 00
const sixtyToZero = num => {
    if (num == 60) {
        num = "00"
    }
    return num
}


//  Function to add leading zeros if needed
function addLeadingZero(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}


// Card object definition
class Card {
    constructor(_class, _initialTime) {
        this.topCardNumber = document.querySelector("." + _class + "--top--number");
        this.bottomCardNumber = document.querySelector("." + _class + "--bottom--number");
        this.bottomCardTitle = document.querySelector("." + _class + "--bottom--number_2");
        this.cardTitle = document.getElementById(_class);
        this.topCard = document.querySelector("." + _class + "--top");
        this.bottomCard = document.querySelector("." + _class + "--bottom");
        this.actualTime = _initialTime;
        this.pastTime = _initialTime;
        this.updateTimer();
    }

    setNewTimes(_time) {
        this.pastTime = this.actualTime;
        this.actualTime = sixtyToZero(addLeadingZero(_time));
        this.updateTimer()
        if (this.actualTime !== this.pastTime) {
            this.flipCard();
        }
    }

    updateTimer() {
        this.cardTitle.innerHTML = this.actualTime;
        this.cardbottomCardTitle.innerHTML = this.pastTime
        this.bottomCardNumber.innerHTML = this.actualTime;
        this.topCardNumber.innerHTML = this.pastTime;
    }

    flipCard() {
        this.topCard.classList.remove("activated");
        this.bottomCard.classList.remove("activated");
        void this.topCard.offsetWidth;
        // void this.bottomCard.offsetWidth;
        this.bottomCard.classList.add("activated");
        this.topCard.classList.add("activated");
    }
}

// function updateAllTimer () {
//     daysCard.updateTimer();
//     hoursCard.updateTimer();
//     minutesCard.updateTimer();
//     secondsCard.updateTimer();
// }


// Create Card Objects
const daysCard = new Card("days", "14");
const hoursCard = new Card("hours", "00");
const minutesCard = new Card("minutes", "00");
const secondsCard = new Card("seconds", "00");


// Set counter final day
const finish = new Date();
finish.setDate(finish.getDate() + 14);


// Start countdown
setInterval(() => {
    const actualTime = new Date();
    const timeDifference = difference(finish, actualTime);

    daysCard.setNewTimes(Math.floor(timeDifference / days));
    hoursCard.setNewTimes(Math.floor((timeDifference % days) / hours));
    minutesCard.setNewTimes(Math.floor((timeDifference % hours) / minutes));
    secondsCard.setNewTimes((Math.floor((timeDifference % minutes) / seconds) + 1));

    // setTimeout(updateAllTimer, 999)

}, 1000);
