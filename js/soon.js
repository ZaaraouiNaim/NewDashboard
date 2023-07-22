const body = document.querySelector("body"),
  homePage = document.querySelector(".page"),
  smMediaQuery = window.matchMedia(`(max-width: 767px)`),
  mdMediaQuery = window.matchMedia(`(max-width: 991px)`);

/* ====== Start Chatbot ====== */

const chatToggler = document.querySelector(".chatbot-toggler"),
  chatBox = document.querySelector(".chatbox"),
  chatInput = document.querySelector(".chatbot textarea"),
  chatSendBtn = document.querySelector(".chatbot .send-btn");

let userMessage;
const initInputHeight = chatInput.scrollHeight;
const API_KEY = "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";

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);

  chatLi.innerHTML =
    className == "outgoing"
      ? `<p></p>`
      : `<span><i class="bx bxl-python"></i></span><p></p>`;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  // const API_URL = "main.json";

  const messageElement = incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then(
      (data) => (messageElement.textContent = data.choices[0].message.content)
    )
    .catch((err) => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${initInputHeight}px`;

  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  chatBox.scrollTo(0, chatBox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatBox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);
  }, 600);
};

chatToggler.addEventListener("click", () => {
  chatBox.innerHTML = `<li class="chat incoming">
            <span><i class="bx bxl-python"></i></span>
            <p>Hi there.<br />Welcome to Web School.<br />How can I help you today?</p>
          </li>`;
  chatInput.value = "";
  chatInput.style.height = `${initInputHeight}px`;
  homePage.classList.toggle("show-chatbot");
  if (homePage.classList.contains("show-chatbot")) {
    const chatSpeak = window.speechSynthesis;
    const text = "Hi here. Welcome to Web School. How can I help you today?";
    const utternace = new SpeechSynthesisUtterance(text);
    chatSpeak.speak(utternace);
  }
});

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
  chatInput.scrollTo(0, chatInput.scrollHeight);
});

chatInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  } else {
    return;
  }
});

chatSendBtn.addEventListener("click", handleChat);

/* ====== End Chatbot ====== */

/* ======= Start Sidebar ====== */

const sidebar = document.querySelector(".page-sidebar"),
  toggle = document.querySelector(".toggle"),
  arrows = document.querySelectorAll(".page-sidebar .arrow"),
  modeSwitch = document.querySelector(".toggle-switch"),
  modeText = document.querySelector(".mode-text");

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("show-menu");
  });
});

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modeText.innerText = "Light Mode";
  } else {
    modeText.innerText = "Dark Mode";
  }
});
/* ===== End Sidebar ====== */

/* ===== Start Header ====== */

const profileIcon = document.querySelector(".profile-icon"),
  searchIcon = document.querySelector(".search-icon"),
  searchInput = document.querySelector(".search-input");

searchIcon.addEventListener("click", () =>
  searchIcon.classList.toggle("show-input")
);

profileIcon.addEventListener("click", (e) => {
  e.preventDefault();
  profileIcon.classList.toggle("show-menu");
});

/* ===== End Header ====== */
/* ===== Start Main Content ===== */

function handleSmMediaChange(e) {
  if (e.matches) {
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
  }
}

smMediaQuery.addEventListener("change", handleSmMediaChange);
handleSmMediaChange(smMediaQuery);

/* ===== Start Coming Soon Pages ===== */

const seconds = document.querySelector(
    ".soon .soon-container .seconds .number"
  ),
  minutes = document.querySelector(".soon .soon-container .minutes .number"),
  hours = document.querySelector(".soon .soon-container .hours .number"),
  days = document.querySelector(".soon .soon-container .days .number");

const countDownDate = new Date("Dec, 31 2023 23:59:59").getTime();

const timeFunction = setInterval(() => {
  let dateNow = new Date().getTime();

  let dateDiff = countDownDate - dateNow;

  let daysTime = Math.floor(dateDiff / (1000 * 60 * 60 * 24)),
    hoursTime = Math.floor(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutesTime = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60)),
    secondsTime = Math.floor((dateDiff % (1000 * 60)) / 1000);

  days.innerText = daysTime;
  hours.innerText = hoursTime < 10 ? `0${hoursTime}` : hoursTime;
  minutes.innerText = minutesTime < 10 ? `0${minutesTime}` : minutesTime;
  seconds.innerText = secondsTime < 10 ? `0${secondsTime}` : secondsTime;

  if (dateDiff == 0) {
    clearInterval(timeFunction);
  }
}, 1000);

/* ===== End Coming Soon Pages ===== */
/* ==== End Main Content ===== */

const upButton = document.querySelector(".up-button");

window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? (upButton.style.transform = "scale(1)")
    : (upButton.style.transform = "scale(0)");
});

upButton.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);