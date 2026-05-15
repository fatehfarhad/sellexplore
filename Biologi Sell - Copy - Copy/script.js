// ==================== GLOBAL ERROR HANDLING ====================

// Catch all unhandled errors
window.addEventListener("error", function (event) {
  console.error("Global error caught:", event.error);
  // Optionally show user-friendly message
  // alert('Terjadi kesalahan: ' + event.error.message);
});

// Catch unhandled promise rejections
window.addEventListener("unhandledrejection", function (event) {
  console.error("Unhandled promise rejection:", event.reason);
  // Optionally show user-friendly message
  // alert('API Error: ' + event.reason);
});

// Check if api-integration.js is loaded
if (typeof apiCall === "undefined") {
  console.warn("API integration not loaded. Some features may not work.");
  // Provide fallback for API functions
  window.apiCall = async function () {
    console.error("API not available. Make sure api-integration.js is loaded.");
    throw new Error("API integration not loaded");
  };
}

// ==================== SPLASH SCREEN FUNCTIONS ====================

function closeSplashScreen() {
  const splashScreen = document.getElementById("splashScreen");
  const mainContent = document.getElementById("mainContent");

  if (splashScreen && mainContent) {
    // Hide splash screen
    splashScreen.style.display = "none";
    // Show main content
    mainContent.style.display = "block";
    // Mark that splash screen has been seen
    sessionStorage.setItem("splashClosed", "true");
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  const splashScreen = document.getElementById("splashScreen");
  const mainContent = document.getElementById("mainContent");

  // Check if splash screen was already closed in this session
  const splashClosed = sessionStorage.getItem("splashClosed");

  if (splashClosed) {
    // Splash already closed this session, hide it
    if (splashScreen) splashScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
  } else {
    // First time in this session, show splash
    if (splashScreen) splashScreen.style.display = "flex";
    if (mainContent) mainContent.style.display = "none";
  }

  // Add Enter key support to close splash
  document.addEventListener("keydown", function (event) {
    const splashScreen = document.getElementById("splashScreen");
    if (
      event.key === "Enter" &&
      splashScreen &&
      splashScreen.style.display !== "none"
    ) {
      closeSplashScreen();
    }
  });

  // Initialize scroll animations
  initializeScrollAnimations();
});

// ==================== MODAL FUNCTIONS ====================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    // Disable body scroll
    document.body.style.overflow = "hidden";
    modal.classList.add("show");
    modal.scrollTop = 0; // Scroll to top
    // Trigger animations for modal content
    animateModalContent(modal);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    // Enable body scroll
    document.body.style.overflow = "auto";
    // Reset animation classes for next time
    resetModalAnimations(modal);
  }
}

function animateModalContent(modal) {
  if (!modal) return;

  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    // Reset close button animation if exists
    const closeBtn = modalContent.querySelector(".close");
    if (closeBtn) {
      closeBtn.style.animation = "";
      closeBtn.style.opacity = "1";
      closeBtn.style.animationDelay = "";
    }

    // Animate title
    const title = modalContent.querySelector("h2");
    if (title) {
      title.style.animation = "none";
      setTimeout(() => {
        title.style.animation = "";
        title.classList.add("animate-fade-in-down");
      }, 10);
    }

    // Animate all paragraphs, lists, and other content with stagger effect
    const contentElements = modalContent.querySelectorAll(
      "p, h3, h4, li, label, div.form-group, div.quiz-question, .competency-item, .glossary-item, .reference, .video-item, .profile-card, .progress-section",
    );

    contentElements.forEach((el, index) => {
      el.style.animation = "none";
      el.style.opacity = "0";
      setTimeout(() => {
        el.style.animation = "";
        el.classList.add("animate-fade-in-up");
        el.style.animationDelay = `${index * 0.1}s`;
      }, 10);
    });
  }
}

function resetModalAnimations(modal) {
  if (!modal) return;
  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    const elements = modalContent.querySelectorAll("*");
    elements.forEach((el) => {
      el.style.animation = "";
      el.style.animationDelay = "";
      el.classList.remove(
        "animate-fade-in-up",
        "animate-fade-in-down",
        "animate-fade-in-left",
        "animate-fade-in-right",
        "animate-zoom-in",
      );
    });
  }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal.show");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  });
};

// ==================== SCROLL FUNCTIONS ====================

function scrollToSection(sectionId) {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// ==================== TAB FUNCTIONS ====================

function showTab(tabId) {
  // Hide all tabs
  const allTabs = document.querySelectorAll(".tab-content");
  allTabs.forEach((tab) => tab.classList.remove("active"));

  // Remove active class from all buttons
  const allButtons = document.querySelectorAll(".tab-button");
  allButtons.forEach((btn) => btn.classList.remove("active"));

  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Add active class to clicked button
  if (event) {
    event.target.classList.add("active");
  }
}

// ==================== MENU TOGGLE ====================

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }
});

// ==================== GLOSSARY SEARCH ====================

const glossarySearch = document.getElementById("glossarySearch");
if (glossarySearch) {
  glossarySearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const glossaryItems = document.querySelectorAll(".glossary-item");

    glossaryItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// ==================== QUIZ/GAME QUESTIONS ====================

const quizQuestions = [
  {
    question: "Organel sel yang berfungsi sebagai pusat energi adalah?",
    options: ["Inti sel", "Mitokondria", "Ribosom", "Golgi apparatus"],
    correct: 1,
  },
  {
    question: "Proses pembuatan makanan menggunakan cahaya matahari disebut?",
    options: ["Respirasi", "Fotosintesis", "Fermentasi", "Transpirasi"],
    correct: 1,
  },
  {
    question: "Membran sel berfungsi untuk?",
    options: [
      "Menyimpan energi",
      "Mengontrol masuk keluarnya zat",
      "Tempat sintesis protein",
      "Memproduksi energi",
    ],
    correct: 1,
  },
  {
    question:
      "Tumbuhan hijau dapat membuat makanannya sendiri karena memiliki?",
    options: ["Akar", "Kloroplas", "Vakuola", "Dinding sel"],
    correct: 1,
  },
  {
    question: "Proses respirasi menghasilkan energi dalam bentuk?",
    options: ["ATP", "Glukosa", "Oksigen", "Karbohidrat"],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let answeredQuestions = [];

function initializeGame() {
  currentQuestion = 0;
  score = 0;
  answeredQuestions = [];
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestion < quizQuestions.length) {
    const questionObj = quizQuestions[currentQuestion];
    const questionDisplay = document.getElementById("question");
    const optionsDisplay = document.getElementById("options");

    if (questionDisplay && optionsDisplay) {
      questionDisplay.textContent = `Soal ${currentQuestion + 1}: ${questionObj.question}`;
      optionsDisplay.innerHTML = "";

      questionObj.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsDisplay.appendChild(button);
      });
    }
  }
}

function selectAnswer(selectedIndex) {
  if (currentQuestion < quizQuestions.length) {
    const questionObj = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll(".option-button");

    buttons.forEach((button) => {
      button.disabled = true;
    });

    if (selectedIndex === questionObj.correct) {
      buttons[selectedIndex].classList.add("correct");
      score++;
    } else {
      buttons[selectedIndex].classList.add("incorrect");
      buttons[questionObj.correct].classList.add("correct");
    }

    answeredQuestions.push({
      question: questionObj.question,
      selected: selectedIndex,
      correct: questionObj.correct,
      isCorrect: selectedIndex === questionObj.correct,
    });
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    displayQuestion();
  } else {
    showGameResult();
  }
}

function showGameResult() {
  const gameArea = document.getElementById("gameArea");
  const percentage = (score / quizQuestions.length) * 100;

  if (gameArea) {
    gameArea.innerHTML = `
            <div class="evaluation-result">
                <h3>Hasil Kuis Anda</h3>
                <p>Skor: ${score}/${quizQuestions.length}</p>
                <p>Persentase: ${percentage.toFixed(1)}%</p>
                <p>${getMotivationalMessage(percentage)}</p>
                <button class="btn-primary" onclick="resetGame()">Kerjakan Ulang</button>
            </div>
        `;
  }
}

function resetGame() {
  initializeGame();
}

function getMotivationalMessage(percentage) {
  if (percentage === 100) {
    return "🌟 Sempurna! Anda menguasai semua materi!";
  } else if (percentage >= 80) {
    return "🎉 Luar biasa! Anda hampir menguasai semua materi!";
  } else if (percentage >= 60) {
    return "👍 Bagus! Anda memahami sebagian besar materi. Terus belajar!";
  } else if (percentage >= 40) {
    return "📚 Anda sudah mulai memahami. Mari belajar lebih banyak!";
  } else {
    return "💪 Jangan menyerah! Pelajari kembali materi yang belum dipahami.";
  }
}

// ==================== EVALUATION FORM ====================

const quizForm = document.getElementById("quizForm");
if (quizForm) {
  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let quizScore = 0;
    const answers = {
      q1: "b",
      q2: "b",
      q3: "b",
      q4: "b",
      q5: "c",
      q6: "c",
      q7: "c",
      q8: "b",
      q9: "b",
      q10: "c",
    };

    const detailedResults = [];
    for (let key in answers) {
      const selectedAnswer = document.querySelector(
        `input[name="${key}"]:checked`,
      );
      const isCorrect = selectedAnswer && selectedAnswer.value === answers[key];
      if (isCorrect) {
        quizScore++;
      }
      detailedResults.push({
        question: key,
        selected: selectedAnswer ? selectedAnswer.value : "Tidak dijawab",
        correct: answers[key],
        isCorrect: isCorrect,
      });
    }

    const totalQuestions = Object.keys(answers).length;
    const percentage = (quizScore / totalQuestions) * 100;

    let achievement = "";
    let emoji = "😐";
    if (percentage === 100) {
      achievement = "🏆 SEMPURNA!";
      emoji = "🏆";
    } else if (percentage >= 80) {
      achievement = "⭐ Luar Biasa!";
      emoji = "⭐";
    } else if (percentage >= 60) {
      achievement = "👍 Bagus!";
      emoji = "👍";
    } else if (percentage >= 40) {
      achievement = "📚 Cukup, terus belajar!";
      emoji = "📚";
    } else {
      achievement = "💪 Jangan putus asa, coba lagi!";
      emoji = "💪";
    }

    const resultDiv = document.getElementById("evaluationResult");
    resultDiv.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 60px; margin-bottom: 10px;">${emoji}</div>
        <h2 style="color: #333; margin: 10px 0;">${achievement}</h2>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 20px; margin: 20px 0; color: white;">
          <div style="font-size: 24px; font-weight: bold;">${quizScore}/${totalQuestions}</div>
          <div style="font-size: 16px;">Jawaban Benar</div>
        </div>
        <div style="background: #f0f4ff; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; border-radius: 5px;">
          <div style="font-size: 28px; font-weight: bold; color: #667eea;">${percentage.toFixed(1)}%</div>
          <div style="color: #666;">Persentase Keberhasilan</div>
        </div>
        <div style="margin-top: 20px; text-align: left; background: #fff9e6; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
          <h4 style="margin-top: 0; color: #ff9800;">📝 Analisis Jawaban:</h4>
          <div style="max-height: 200px; overflow-y: auto;">`;

    detailedResults.forEach((result) => {
      const icon = result.isCorrect ? "✅" : "❌";
      const style = result.isCorrect ? "color: #4CAF50" : "color: #f44336";
      resultDiv.innerHTML += `<div style="padding: 8px 0; border-bottom: 1px solid #ffe0b2; ${style}"><strong>${icon} ${result.question}:</strong> ${result.selected} ${!result.isCorrect ? `(Jawaban: ${result.correct})` : ""}</div>`;
    });

    resultDiv.innerHTML += `
          </div>
        </div>
        <div style="margin-top: 20px;">
          <p style="color: #666; font-size: 14px;">${getMotivationalMessage(percentage)}</p>
          <button class="btn-primary" onclick="resetEvaluation();" style="margin-top: 10px;">
            🔄 Coba Lagi
          </button>
        </div>
      </div>
    `;
    document.getElementById("quizForm").style.display = "none";
    resultDiv.style.display = "block";
  });
}

function resetEvaluation() {
  const quizForm = document.getElementById("quizForm");
  const resultDiv = document.getElementById("evaluationResult");

  if (quizForm) {
    quizForm.reset();
    quizForm.style.display = "block";
  }
  if (resultDiv) {
    resultDiv.style.display = "none";
  }
}

// ==================== LKPD FORM ====================

const lkpdForm = document.getElementById("lkpdForm");
if (lkpdForm) {
  lkpdForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = this.querySelector('input[type="text"]').value;
    alert(`Terima kasih ${nama}! LKPD Anda telah berhasil dikirim.`);
    this.reset();
  });
}

// ==================== REFLECTION FORM ====================

const reflectionForm = document.getElementById("reflectionForm");
if (reflectionForm) {
  reflectionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const textareas = this.querySelectorAll("textarea");
    const responses = Array.from(textareas).map((ta) => ta.value);

    localStorage.setItem("reflections", JSON.stringify(responses));

    alert(
      "Refleksi Anda telah berhasil disimpan. Terima kasih telah merefleksikan pembelajaran Anda!",
    );
    this.reset();
  });
}

// ==================== PAGE LOAD INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.getElementById("gameArea");
  if (gameArea) {
    // Game will be initialized when modal opens
  }

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.querySelector(".nav-menu");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu) {
        navMenu.classList.remove("show");
      }
    });
  });
});

// ==================== UTILITY FUNCTIONS ====================

function loadReflections() {
  const saved = localStorage.getItem("reflections");
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

function exportUserData() {
  const userData = {
    timestamp: new Date().toISOString(),
    reflections: loadReflections(),
    gameScore: score,
    totalQuestions: quizQuestions.length,
  };

  const dataStr = JSON.stringify(userData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `learning_data_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
}

// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener("keydown", function (event) {
  // ESC to close modal
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal.show");
    modals.forEach((modal) => {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    });
  }
});

// ==================== SCROLL ANIMATIONS ====================

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animationType =
          entry.target.dataset.animation || "animate-fade-in-up";
        entry.target.classList.add(animationType);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(
    ".hero, .guide-section, .features-section, .guide-card, .feature-box, .guide-grid, .features-grid, .hero-content, .hero-image, h2, h3, p, .btn-primary, .btn-secondary",
  );

  elementsToAnimate.forEach((element, index) => {
    if (
      element.closest(".modal") ||
      element.closest(".splash-screen") ||
      element.closest(".footer")
    ) {
      return;
    }

    let animationType = "animate-fade-in-up";

    if (element.classList.contains("hero-content")) {
      animationType = "animate-fade-in-left";
    } else if (element.classList.contains("hero-image")) {
      animationType = "animate-fade-in-right";
    } else if (
      element.classList.contains("feature-box") ||
      element.classList.contains("guide-card")
    ) {
      animationType = "animate-zoom-in";
    }

    element.dataset.animation = animationType;
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.willChange = "opacity, transform";

    observer.observe(element);
  });

  const gridContainers = document.querySelectorAll(
    ".features-grid, .guide-grid, .videos-grid",
  );
  gridContainers.forEach((container) => {
    container.classList.add("animate-stagger");
  });
}
