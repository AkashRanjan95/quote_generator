const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const shareBtn = document.getElementById('share');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    // Pick a quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author value null
    if (!quote.author) {
        authorText.textContent = 'Anonymous';
    } else {
        authorText.textContent = quote.author;
    }
    // Check the quote length
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert('Here is the error', error)
    }
}

// Share quote
function shareQuote() {
    const shareQuote = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(shareQuote, '_blank');
}

// Eventlistener
newQuoteBtn.addEventListener('click', newQuote);
shareBtn.addEventListener('click', shareQuote);

// On load
getQuotes();
// loading();