// Constants and DOM objects
const finish = new Date();
finish.setDate(finish.getDate() + 14)
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const daysContainer = document.querySelector(".days")
const hoursContainer = document.querySelector(".hours")
const minutesContainer = document.querySelector(".minutes")
const secondsContainer = document.querySelector(".seconds")


function flipCard(card) {
    card.classList.toggle("flipped");
}

// Functions

function difference(endTime, startTime){
    return endTime - startTime;
};

function addLeadingZero(num){
    if (num < 10) {
        num = "0" + num
    }
    return num
}



//  Interval to make the countdown

setInterval(() => {
const actualTime = new Date();
const timeDifference = difference(finish, actualTime);
let leftTime = {
    d : Math.floor(timeDifference / (60*60*1000*24)),
    h : Math.floor(timeDifference / (60*60*1000)),
    m : Math.floor(timeDifference / 60000),
    s : ((timeDifference % 60000) / 1000).toFixed(0),
}

// Add leading zero if needed

leftTime.d = addLeadingZero(leftTime.d);
leftTime.h = addLeadingZero(leftTime.h - leftTime.d*24);
leftTime.m = addLeadingZero(leftTime.m - leftTime.d*24*60 - leftTime.h*60);
leftTime.s = addLeadingZero(leftTime.s);

//  Change numbers in HTML

days.innerHTML = leftTime.d;
hours.innerHTML = leftTime.h;
minutes.innerHTML = leftTime.m;
seconds.innerHTML = leftTime.s;

flipCard(secondsContainer);

console.log(leftTime)

}, 1000);