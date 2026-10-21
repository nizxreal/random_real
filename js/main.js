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

let currentIndex = 0;
let autoRotate = true;

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
  updateClock();
  setInterval(updateClock, 1000);
  renderUcapan();
  updateGreeting();

  setInterval(() => {
    if (autoRotate) {
      nextUcapan();
    }
  }, 3000);
});
