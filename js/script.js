// 📝 My Own Quotes
// const myQuotes = [
//   { text: "Stay true to yourself and never give up.", author: "Tony-Pio" },
//   { text: "Learning every day keeps the mind young.", author: "Tony-Pio" },
//   { text: "Code, create, inspire.", author: "Tony-Pio" },
//   { text: "Dream big, work hard, stay humble.", author: "Tony-Pio" },
//   { text: "Sometime's, in order to write about life first, you most live it.", author: "Tony-Pio"},
//   { text: "The doorstep to the temple of wisdom is the knowledge of our own ignorance.", author: "TYSON MANDELA"},
//   { text: "We only live once, but if we live well, once is enough.", author: "Baron"},
//   { text: "Never interrupt your enemy when he's making a mistake.", author: "Went-Wort Millar"},
//   { text: "There are no regrets in life, just lessons.", author: "Tony-Pio"}
// ];

// // 🎨 Background colors
// const colors = [
//   "#222", "#1abc9c", "#3498db", "#9b59b6",
//   "#e67e22", "#e74c3c", "#2ecc71", "#34495e", "#f39c12"
// ];
// async function generateQuote() {
//   // 🎯 90% API, 10% your quotes
//   const useApi = Math.random() < 0.9;

//   if (useApi) {
//     console.log("🔵 Fetching from ZenQuotes via corsproxy.io...");
//     try {
//       // ✅ Use corsproxy.io + timestamp to avoid caching
//       const response = await fetch(
//         "https://corsproxy.io/?" + encodeURIComponent("https://zenquotes.io/api/random?nocache=" + new Date().getTime())
//       );

//       if (!response.ok) throw new Error("❌ Proxy/API response not ok");

//       // 🔥 corsproxy.io already gives us JSON, so just read it
//       const data = await response.json();
//       console.log("✅ API Quote Fetched:", data);

//       // ✅ ZenQuotes API returns: [{ q: "Quote text", a: "Author" }]
//       fadeQuote(data[0].q, data[0].a);
//     } catch (error) {
//       console.log("🚨 API Fetch Error:", error);
//       showFallbackQuote();
//     }
//   } else {
//     console.log("🟠 Showing your own quote");
//     showFallbackQuote();
//   }

//   // 🎨 Change background color
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];
//   document.body.style.background = randomColor;
// }


// // ✨ Helper for fade animation
// function fadeQuote(quote, author) {
//   const quoteText = document.getElementById("quote");
//   const authorText = document.getElementById("author");

//   // Fade out
//   quoteText.style.opacity = 0;
//   authorText.style.opacity = 0;

//   setTimeout(() => {
//     // Update text
//     quoteText.innerText = quote;
//     authorText.innerText = author ? "- " + author : "";

//     // Fade in
//     quoteText.style.opacity = 1;
//     authorText.style.opacity = 1;
//   }, 300);
// }

// // 🔄 Show one of your quotes if API is not used or fails
// function showFallbackQuote() {
//   const randomIndex = Math.floor(Math.random() * myQuotes.length);
//   const selectedQuote = myQuotes[randomIndex];
//   fadeQuote(selectedQuote.text, selectedQuote.author);
// }

// // 🐦 Tweet the current quote
// function tweetQuote() {
//   const quote = document.getElementById("quote").innerText;
//   const author = document.getElementById("author").innerText;
//   const tweetText = `${quote} ${author}`;
//   const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
//   window.open(tweetUrl, "_blank");
// }




// 📝 My Quotes 
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

// 🎨 Background colors
const colors = [
  "#222", "#1abc9c", "#3498db", "#9b59b6",
  "#e67e22", "#e74c3c", "#2ecc71", "#34495e", "#f39c12"
];

// 🎲 MAIN FUNCTION: Show quote from API or your list (50/50)
async function generateQuote() {
  // 🎯 50% API, 50% your quotes
  const useApi = Math.random() < 0.5;

  if (useApi) {
    console.log("🔵 Fetching from ZenQuotes via corsproxy.io...");
    try {
      // ✅ Use corsproxy.io + timestamp to stop caching
      const response = await fetch(
        "https://corsproxy.io/?" + encodeURIComponent("https://zenquotes.io/api/random?nocache=" + new Date().getTime())
      );

      if (!response.ok) throw new Error("❌ Proxy/API response not ok");

      // 🔥 corsproxy.io already sends JSON, no need for JSON.parse()
      const data = await response.json();
      console.log("✅ API Quote Fetched:", data);

      // ✅ ZenQuotes API returns: [{ q: "Quote text", a: "Author" }]
      fadeQuote(data[0].q, data[0].a);
    } catch (error) {
      console.log("🚨 API Fetch Error:", error);
      showFallbackQuote();
    }
  } else {
    console.log("🟠 Showing one of your own quotes");
    showFallbackQuote();
  }

  // 🎨 Change background color every click
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
}

// ✨ Fade-in / Fade-out animation for quotes
function fadeQuote(quote, author) {
  const quoteText = document.getElementById("quote");
  const authorText = document.getElementById("author");

  // Fade out
  quoteText.style.opacity = 0;
  authorText.style.opacity = 0;

  setTimeout(() => {
    // Update text
    quoteText.innerText = quote;
    authorText.innerText = author ? "- " + author : "";

    // Fade in
    quoteText.style.opacity = 1;
    authorText.style.opacity = 1;
  }, 300);
}

// 🔄 Show one of your personal quotes if API is not used or fails
function showFallbackQuote() {
  const randomIndex = Math.floor(Math.random() * myQuotes.length);
  const selectedQuote = myQuotes[randomIndex];
  fadeQuote(selectedQuote.text, selectedQuote.author);
}

// 🐦 Tweet the current quote
function tweetQuote() {
  const quote = document.getElementById("quote").innerText;
  const author = document.getElementById("author").innerText;
  const tweetText = `${quote} ${author}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, "_blank");
}
