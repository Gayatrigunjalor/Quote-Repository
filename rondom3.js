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
    try {
        btnQuote.textContent = "Loading...";
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw new Error("Failed to fetch quote.");
        
        const { content, author } = await response.json();
        quoteTxt.textContent = content;
        authorEl.textContent = author;
    } catch (error) {
        quoteTxt.textContent = "An error occurred. Please try again.";
        authorEl.textContent = "";
        console.error(error);
    } finally {
        btnQuote.textContent = "New Quote";
    }
}

// Function to speak the quote
function speechTxt() {
    let speechText = new SpeechSynthesisUtterance(quoteTxt.textContent);
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speechText.voice = voices[0];
    }
    window.speechSynthesis.speak(speechText);
}



// Copy quote to clipboard
copyEl.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteTxt.innerText);
    messageEl.classList.add("active");
    setTimeout(() => {
        messageEl.classList.remove("active");
    }, 2500);
});


twitterEl.addEventListener("click", () => {
    let encodedContent = encodeURIComponent(quoteTxt.innerText);
    let tweet = `https://twitter.com/intent/tweet?text=${encodedContent}`;
    window.open(tweet, "_blank");
});


speechEl.addEventListener("click", speechTxt);
btnQuote.addEventListener("click", randomQuote);

window.speechSynthesis.addEventListener('voiceschanged', () => {
    speechTxt(); // Load voices initially
});
