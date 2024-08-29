"use strict";

const quoteTxt = document.querySelector(".quote");
const btnQuote = document.querySelector(".btn-quote");
const authorEl = document.querySelector(".author");
const speechEl = document.querySelector(".speech");
const copyEl = document.querySelector(".copy");
const twitterEl = document.querySelector(".twitter");
const messageEl = document.querySelector(".message");

//-----Random Quote Generator----//
async function randomQuote() {
    btnQuote.textContent = "loading";
    const data = await fetch("https://api.quotable.io/random");
    const result = await data.json();
    const { content, author } = result;
    quoteTxt.textContent = content;
    authorEl.textContent = author;
    btnQuote.textContent = "New Quote";
}

// Function to speak the quote
function speechTxt() {
    let speechText = new SpeechSynthesisUtterance(quoteTxt.textContent);
    window.speechSynthesis.addEventListener('voiceschanged', () => {
        speechText.voice = window.speechSynthesis.getVoices()[0];
        window.speechSynthesis.speak(speechText);
    });
}

//------Btn Events---------//

// Copy quote to clipboard
copyEl.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteTxt.innerText);
    messageEl.classList.add("active");
    setTimeout(() => {
        messageEl.classList.remove("active");
    }, 2500);
});

// Share quote on Twitter
twitterEl.addEventListener("click", () => {
    let encodedContent = encodeURIComponent(quoteTxt.innerText);
    let tweet = `https://twitter.com/intent/tweet?text=${encodedContent}`;
    window.open(tweet, "_blank");
});

// Add event listeners
speechEl.addEventListener("click", speechTxt);
btnQuote.addEventListener("click", randomQuote);
