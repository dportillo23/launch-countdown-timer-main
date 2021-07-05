// Constants
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;


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
        this.updateTimer();
        if (this.actualTime !== this.pastTime) {
            console.log(this.actualTime, this.pastTime);
            this.flipCard()
        }
    }

    updateTimer() {
        this.cardTitle.innerHTML = this.actualTime;
        this.bottomCardNumber.innerHTML = this.actualTime;
        this.topCardNumber.innerHTML = this.actualTime;
        console.log(this.cardTitle, this.bottomCardNumber, this.topCardNumber);
    }

    flipCard() {
        console.log("Flip Card " + this.cardTitle.id);
    }


}


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

}, 1000);