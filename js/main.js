const ucapanList = [
  "Jangan lupa istirahat, Savira! Kehidupan itu seperti bunga yang butuh waktu untuk mekar. Semangat terus!",
  "Setiap pagi adalah startslip baru. Wahai Savira Dwi Hafsari, terus berinovasi dan tunjukkan talenta mu!",
  "Keiburan itu kadang berat, tapi tekadmu tetap ringan. Selalu percaya pada diri sendiri ya!",
  "Bersyukur atas apa yang sudah kita miliki hari ini. Besok akan lebih baik, terutama untuk Savira!",
  "Jika kamu bisa mengubah satu garis kode, kamu bisa mengubah seluruh dunia. Selamat tidur, Savira!",
  "Hari ini adalah langkah maju. Wahai Savira Dwi Hafsari, terus berusaha yang terbaik!",
  "Kesuksesan bukan tujuan akhir, tapi hasil dari usaha konsisten. Tunjukkan kekuatanmu!",
  "Malam ini adalah mukmin untuk mimpi berikutnya. Bangun dengan semangat, Savira!",
  "Setiap masalah adalah peluang untuk belajar. Lihat detik-detik kunci di depan matamu!",
  "Kita tidak pernah berakhir, hanya berpindah tempat. Teruslah maju dengan hati tenang!"
];

const photoLabels = ["Foto 1", "Foto 2", "Foto 3", "Foto 4", "Foto 5", "Foto 6"];

let currentIndex = 0;
let autoRotate = true;

function initFloatingElements() {
  const wrap = document.createElement("div");
  wrap.className = "float-wrap";
  wrap.setAttribute("aria-hidden", "true");

  const emojis = ["💖", "✨", "🎂", "🎉", "🌟", "💝", "🎈", "🍰"];
  const count = 16;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "float-item";
    item.textContent = emojis[i % emojis.length];
    item.style.left = `${Math.random() * 90}%`;
    item.style.top = `${Math.random() * 90}%`;
    item.style.animationDelay = `${Math.random() * 4}s`;
    item.style.animationDuration = `${4 + Math.random() * 4}s`;
    wrap.appendChild(item);
  }

  document.body.appendChild(wrap);
}

function initStars() {
  const sky = document.getElementById("sky");
  if (!sky) return;
  const count = 60;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 3 + 2;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty("--duration", `${duration}s`);
    sky.appendChild(star);
  }
}

function updateClock() {
  const now = new Date();
  const jamEl = document.getElementById("jam");
  const tglEl = document.getElementById("tanggal");

  if (jamEl) {
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    jamEl.textContent = `${hours}:${minutes}:${seconds}`;
  }

  if (tglEl) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    tglEl.textContent = now.toLocaleDateString("id-ID", options);
  }

  updateGreeting();
}

function getTimeGreeting() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 15 && hour < 18) return "Sore";
  if (hour >= 12 && hour < 15) return "Siang";
  if (hour >= 18 && hour < 21) return "Malam";
  if (hour >= 6 && hour < 12) return "Pagi";
  return "Malam";
}

const CONSTANT_NAME = "Savira Dwi Hafsari";

function updateGreeting() {
  const greetingEl = document.getElementById("greeting");
  const timeGreeting = getTimeGreeting();

  if (greetingEl) {
    greetingEl.textContent = `${timeGreeting}, ${CONSTANT_NAME}`;
  }
}

function renderUcapan() {
  const textEl = document.getElementById("baris-ucapan");
  const footEl = document.getElementById("indeks-ucapan");
  if (textEl) {
    textEl.textContent = ucapanList[currentIndex];
  }
  if (footEl) {
    footEl.textContent = `Ucapan ${currentIndex + 1} dari ${ucapanList.length}`;
  }
}

function nextUcapan() {
  currentIndex = (currentIndex + 1) % ucapanList.length;
  renderUcapan();
}

async function copyUcapan() {
  const greetingEl = document.getElementById("greeting");
  const textEl = document.getElementById("baris-ucapan");
  const statusEl = document.getElementById("status");

  const fullText = `${greetingEl ? greetingEl.textContent : getTimeGreeting()}, ${CONSTANT_NAME}\\n\\n${textEl ? textEl.textContent : ""}`;

  try {
    await navigator.clipboard.writeText(fullText);
    if (statusEl) {
      statusEl.textContent = "Ucapan berhasil disalin ke clipboard!";
      setTimeout(() => {
        statusEl.textContent = "";
      }, 3000);
    }
  } catch (err) {
    if (statusEl) {
      statusEl.textContent = "Gagal menyalin otomatis.";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initStars();
  initFloatingElements();
  updateClock();
  setInterval(updateClock, 1000);
  renderUcapan();
  updateGreeting();

  const btnBuka = document.getElementById("btn-buka");
  if (btnBuka) {
    btnBuka.addEventListener("click", openGallery);
  }

  const btnBukaKartu = document.getElementById("btn-buka-kartu");
  if (btnBukaKartu) {
    btnBukaKartu.addEventListener("click", toggleGreetingCardContent);
  }

  const btnTutupKartu = document.getElementById("btn-tutup-kartu");
  if (btnTutupKartu) {
    btnTutupKartu.addEventListener("click", toggleGreetingCardContent);
  }

  const greetingClose = document.getElementById("greeting-close");
  if (greetingClose) {
    greetingClose.addEventListener("click", closeGreetingCard);
  }

  setInterval(() => {
    if (autoRotate) {
      nextUcapan();
    }
  }, 3000);
});

function setPhotoLabels() {
  const photos = document.querySelectorAll(".photo-item");
  photos.forEach((el, i) => {
    el.setAttribute("data-label", photoLabels[i] || `Foto ${i + 1}`);
    el.textContent = ["📸", "🖼️", "📷", "🎞️", "🧩", "🌅"][i] || "🖼️";
  });
}

function openGallery() {
  const galleryModal = document.getElementById("modal-gallery");
  if (galleryModal) {
    setPhotoLabels();
    galleryModal.classList.add("active");
  }
  autoRotate = false;

  setTimeout(() => {
    if (galleryModal) {
      galleryModal.classList.remove("active");
    }
    openCake();
  }, 3500);
}

function openCake() {
  const cakeModal = document.getElementById("modal-cake");
  if (cakeModal) {
    cakeModal.classList.add("active");
  }

  setTimeout(() => {
    if (cakeModal) {
      cakeModal.classList.remove("active");
    }
    openGreetingCard();
  }, 3000);
}

function openGreetingCard() {
  const greetingModal = document.getElementById("modal-greeting");
  const greetingMessage = document.getElementById("greeting-message");
  
  if (greetingModal) {
    greetingModal.classList.add("active");
    
    // Set message dari ucapan saat ini
    if (greetingMessage) {
      greetingMessage.textContent = ucapanList[currentIndex];
    }
  }
}

function closeGreetingCard() {
  const greetingModal = document.getElementById("modal-greeting");
  if (greetingModal) {
    greetingModal.classList.remove("active");
  }
  autoRotate = true;
}

function toggleGreetingCardContent() {
  const cardFront = document.querySelector(".greeting-card-front");
  const cardBack = document.querySelector(".greeting-card-back");
  
  if (cardFront && cardBack) {
    cardFront.classList.toggle("hidden");
    cardBack.classList.toggle("hidden");
  }
}

function closeModal(modalEl) {
  if (modalEl) {
    modalEl.classList.remove("active");
  }
  autoRotate = true;
}
