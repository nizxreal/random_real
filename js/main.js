const ucapanList = [
  "Istirahat yang cukup. Semoga harimu menyenangkan dan esok hari membawa hal-hal baik.",
  "Lepaskan semua lelah hari ini. Tarik napas dalam-dalam, malam ini milikmu untuk beristirahat.",
  "Tutup hari dengan rasa syukur. Apapun yang terjadi hari ini, kamu sudah berusaha yang terbaik.",
  "Malam tenang adalah hadiah setelah hari yang panjang. Selamat tidur nyenyak.",
  "Semoga esok pagi menyambutmu dengan energi baru dan semangat yang lebih cerah."
];

let currentIndex = 0;

function initStars() {
  const sky = document.getElementById("sky");
  if (!sky) return;
  const count = 40;
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
}

function updateGreeting() {
  const greetingEl = document.getElementById("greeting");
  const nameInput = document.getElementById("nama");
  const name = nameInput ? nameInput.value.trim() : "";

  if (greetingEl) {
    greetingEl.textContent = name ? `Selamat Malam, ${name}` : "Selamat Malam";
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

  const fullText = `${greetingEl ? greetingEl.textContent : "Selamat Malam"}\n\n${textEl ? textEl.textContent : ""}`;

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
  updateClock();
  setInterval(updateClock, 1000);
  renderUcapan();

  const nameInput = document.getElementById("nama");
  if (nameInput) {
    nameInput.addEventListener("input", updateGreeting);
  }

  const btnGanti = document.getElementById("btn-ganti");
  if (btnGanti) {
    btnGanti.addEventListener("click", nextUcapan);
  }

  const btnSalin = document.getElementById("btn-salin");
  if (btnSalin) {
    btnSalin.addEventListener("click", copyUcapan);
  }
});
