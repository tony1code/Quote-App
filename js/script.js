const myQuotes = [
  { text: "Stay true to yourself and never give up.", author: "Tony Pio" },
  { text: "Learning every day keeps the mind young.", author: "Tony Pio" },
  { text: "We only live once, but if we live well, once is enough.", author: "Baron"},
  { text: "Dream big, work hard, stay humble.", author: "Tony Pio" },
  { text: "In order to write about life first, you most live it.", author: "Tony Pio"},
  { text: "The doorstep to the temple of wisdom is the knowledge of our own ignorance.", author: "TYSON MANDELA"},
  { text: "Never interrupt your enemy when he's making a mistake.", author: "Went-Wort Millar"},
  { text: "In a world where you can be anything, be kind.", author: "Baron"},
  { text: "Kill the boy and let the man be born.", author: "Tony Pio"},
  { text: "Sometimes you have to know where you are, to be sure of what to do.", author: "Tony Pio"},
  { text: "EVERY PAIN GIVES A LESSON AND EVERY LESSON CHANGES A PERSON.", author: "Juicy Warld"},
  { text: "Maybe dizzin maybe it's just the beginning.", author: "Juicy Warld"},
  { text: "Be the change you want to see in the world.", author: "Went-Wort Millar"},
  { text: "We are captives of our own identities, living in prisons of our own creation.", author: "T-Bag"}
];

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const themeSwitch = document.getElementById("themeSwitch");
const savedQuotesList = document.getElementById("savedQuotesList");
const quoteOfDayElement = document.getElementById("quoteOfDay");

let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];

// Theme toggle
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load theme + quote of the day
window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme);
  themeSwitch.checked = savedTheme === "dark";
  generateQuote();
  setQuoteOfDay();
};

// Fetch random quote (50% API, 50% local)
async function generateQuote() {
  const useApi = Math.random() < 0.5;

  if (useApi) {
    try {
      const response = await fetch(
        "https://corsproxy.io/?" +
        encodeURIComponent("https://zenquotes.io/api/random?nocache=" + new Date().getTime())
      );
      const data = await response.json();
      fadeQuote(data[0].q, data[0].a);
    } catch (err) {
      console.log("API failed, using my quote", err);
      showLocalQuote();
    }
  } else {
    showLocalQuote();
  }
}

function showLocalQuote() {
  const random = myQuotes[Math.floor(Math.random() * myQuotes.length)];
  fadeQuote(random.text, random.author);
}

// Fade animation
function fadeQuote(quote, author) {
  quoteText.style.opacity = 0;
  authorText.style.opacity = 0;
  setTimeout(() => {
    quoteText.innerText = quote;
    authorText.innerText = author ? "- " + author : "";
    quoteText.style.opacity = 1;
    authorText.style.opacity = 1;
  }, 300);
}

// Quote of the Day
function setQuoteOfDay() {
  const random = myQuotes[Math.floor(Math.random() * myQuotes.length)];
  quoteOfDayElement.innerText = `${random.text} – ${random.author}`;
}

// Save quote
document.getElementById("saveQuoteBtn").addEventListener("click", () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  savedQuotes.push({ quote, author });
  localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
  alert("Quote saved!");
});

// Share options
function shareQuote(platform) {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const text = `${quote} ${author}`;
  let url = "";
  switch(platform) {
    case "WhatsApp":
      url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      break;
    case "Twitter":
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      break;
    case "Facebook":
      url = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(text)}`;
      break;
    case "Telegram":
      url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
      break;
  }
  window.open(url, "_blank");
}

document.getElementById("shareWhatsApp").onclick = () => shareQuote("WhatsApp");
document.getElementById("shareTwitter").onclick = () => shareQuote("Twitter");
document.getElementById("shareFacebook").onclick = () => shareQuote("Facebook");
document.getElementById("shareTelegram").onclick = () => shareQuote("Telegram");

// View saved quotes
document.getElementById("viewSavedBtn").addEventListener("click", () => {
  savedQuotesList.innerHTML = "";
  if (savedQuotes.length === 0) {
    savedQuotesList.innerHTML = "<li>No saved quotes yet</li>";
  } else {
    savedQuotes.forEach((q) => {
      const li = document.createElement("li");
      li.innerText = `${q.quote} ${q.author}`;
      savedQuotesList.appendChild(li);
    });
  }
  document.getElementById("savedModal").style.display = "block";
});

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("savedModal").style.display = "none";
});

// New Quote button (FAB)
document.getElementById("newQuoteBtn").addEventListener("click", generateQuote);
