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

class Card {
    constructor(_class, _initialTime) {
        this.card = document.getElementById(_class);
        this.actualTime = _initialTime;
        this.pastTime = _initialTime;
        this.updateTimer(this.actualTime);
    }

    setNewTimes(_time) {
        this.pastTime = this.actualTime;
        this.actualTime = sistyToZero(addLeadingZero(_time));
        this.updateTimer(this.actualTime);
        console.log(this.actualTime, this.pastTime);
    }

    updateTimer(_newTime) {
        this.card.innerHTML = _newTime;
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

// Create Card Objects
const daysCard = new Card("days", "14");
const hoursCard = new Card("hours", "00");
const minutesCard = new Card("minutes", "00");
const secondsCard = new Card("seconds", "00");


// Functions
function difference(endTime, startTime) {
    return endTime - startTime;
}

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

}, 500);