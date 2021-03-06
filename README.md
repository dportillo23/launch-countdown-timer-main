# Frontend Mentor - Launch countdown timer solution

This is a solution to the [Launch countdown timer challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/launch-countdown-timer-N0XkGfyz-). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

This is a challenge from  used HTML, CSS and vanilla JS to make this challenge. The countdown starts at 14 days from the moment the page is refreshed, so everytime the website refreshes it. 

### The challenge

Users should be able to:

- See hover states for all interactive elements on the page
- See a live countdown timer that ticks down every second (start the count at 14 days)
- **Bonus**: When a number changes, make the card flip from the middle

### Screenshot

![Desktop view]("./images/Countdown-desktop-view.png")
![Mobile view]("./images/Countdown-mobile-view.png")

### Links

- Solution URL: [Add solution URL here](https://github.com/dportillo23/launch-countdown-timer-main)
- Live Site URL: [Add live site URL here](https://dportillo23.github.io/launch-countdown-timer-main/)

## My process

### Built with

- HTML5
- SASS
- Flexbox
- Vanilla JS
- Desktop-first workflow


### What I learned

I had to make a lot of research to flip the cards, and it was an interesting trip to make

I'm very proud of the css for the cards, its animation and different components:


```css
.card--number--container {
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 2.25em;
    height: 2.25em;
    background-color: $col-dark;
    border-radius: $border-radius;
    box-shadow: 0 $border-radius 5px black;
    position: relative;
    transition: all 0.5s ease;
    color: $col-red;
    font-size: 4rem;
    perspective: 400px;

    .card--title {
        height: 55%;
        font-size: 4rem;
        position: absolute;
        overflow: hidden;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .top--card {
        background-color: $col-dark;
        overflow: hidden;
        width: 100%;
        height: 50%;
        position: relative;
        border-bottom: $col-darker 1px solid;
        display: flex;
        justify-content: center;
        z-index: 1;

        opacity: 0;
        transform-origin: center bottom;
        transform-style: preserve-3d;
        border-radius: $border-radius $border-radius 0 0;

        &.activated {
            animation: top-card 0.25s cubic-bezier(.15,.45,.28,1);
            animation-fill-mode: both;
        }

    @keyframes top-card {
        0% {
            transform: rotateX(0deg);
            z-index: 2;
          }
          0%, 99% {
            opacity: 0.99;
          }
          100% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
    }

        span {
            color: $col-red;
            text-align: center;
            position: absolute;
            bottom: -2.6rem;
            transform-style: preserve-3d;


        }
    }

    .bottom--card {
        background-color: $col-dark;
        overflow: hidden;
        width: 100%;
        height: 50%;
        position: relative;
        display: flex;
        justify-content: center;
        border-top: $col-darker 1px solid ;
        padding: 0;
        z-index: 1;
        transform-style: preserve-3d;
        transform-origin: center top;
        transform: rotateX(-90deg);
        opacity: 0;
        border-radius: 0 0 $border-radius $border-radius;

        &.activated {
            animation: bottom-card 0.5s cubic-bezier(.15,.45,.28,1);
            animation-fill-mode: both;
        }

        span {
            color: $col-red;
            position: absolute;
            top: -2.6rem;
            text-align: center;
            transform-style: preserve-3d;
         

        }
    }

    @keyframes bottom-card {
        0%, 50% {
            z-index: -1;
            transform: rotateX(90deg);
            opacity: 0;
          }
          51% {
            opacity: 0.99;
          }
          100% {
            opacity: 0.99;
            transform: rotateX(0deg);
            z-index: 5;
          }
    }

    .bottom--card_2 {
        background-color: $col-dark;
        overflow: hidden;
        width: 100%;
        height: 50%;
        position: absolute;
        display: flex;
        justify-content: center;
        border-top: $col-darker 1px solid ;
        padding: 0;
        z-index: 0;
        transform-style: preserve-3d;
        transform-origin: center top;
        border-radius: 0 0 $border-radius $border-radius;
        bottom: 0;

        span {
            color: $col-red;
            position: absolute;
            top: -2.6rem;
            text-align: center;
            transform-style: preserve-3d;
         

        }
    }

    &::before {
        content: "";
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background-color: $col-darker;
        position: absolute;
        z-index: 10;
        left: -0.6rem;
        top: 50%;
        transform: translateY(-50%)
    }

    &::after {
        content: "";
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background-color: $col-darker;
        position: absolute;
        z-index: 10;
        right: -0.6rem;
        top: 50%;
        transform: translateY(-50%)
    }


}
```

I also like the JS file, it was my first deep touch with JS classes, I thought it was interesting to make each card an object and I think at the end worked pretty well.

```js
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
        this.bottomCardTitle.innerHTML = this.pastTime
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
```


### Continued development

I'm still a beginner in this whole world, I think I need to keep working in my css skills as well as my JS, working with vanilla js helped me to go one step further in my knowledge about Javascript and I will continue working on them.

### Useful resources

- [Flipcard code pen from Shaw](https://codepen.io/shshaw/pen/vKzoLL) - This helped me to build the idea on how animate the cards with css, I even used some of their same concepts in my own animation.
- [OOP by Mosh](https://www.youtube.com/watch?v=PFmuCDHHpwk&t=1556s) - This is an great channel to learn a lot of things about programming and web development, I learned a lot from Mosh to be able to construct the JS objects.



## Author

- Website - [Daniel Portillo](https://dportillo23.github.io/My-Personal-Site/)
- Frontend Mentor - [@dportillo23](https://www.frontendmentor.io/profile/dportillo23)
- GitHub- [dportillo23](https://github.com/dportillo23)


## Acknowledgments

I want to thanks my colleague and cousin Mar??a Fernanda Portillo for the idea and the motivation.


