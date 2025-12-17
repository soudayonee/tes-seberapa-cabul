const headerText = document.querySelector(".header-text");
const nameInput = document.getElementById("name");
const donut = document.querySelector(".donut-fill");
const percentText = document.getElementById("percentText");
const resultTitle = document.querySelector(".result-title");
const resultName = document.querySelector(".result-name");
const seeResult = document.getElementById("seeResult");
const inputContainer = document.querySelector(".input-container");
const resultContainer = document.querySelector(".result-container");
const resultDescription = document.querySelector(".result-description");
const resultGif = document.getElementById("resultGif");
const badResult = document.querySelector(".bad-result");

const radius = 90;
const circumference = 2 * Math.PI * radius;

let isAnimating = false;
let currentResult = null;

const cabulTier = [
  {
    min: 0,
    max: 20,
    description:
      "Kamu Sangat Baik. Tidak Terdeteksi Cabul. Teruskan Anak Muda, Jangan Sampai Menjadi Orang Cabul",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhoMXVrZHg2cGVmamxxMWt4cGdlM2VjOXpnNW85N3QwcmFjNWN5aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QdL3gdDPyEVISx6Hxf/giphy.gif",
  },
  {
    min: 21,
    max: 40,
    description: "Kamu Masih Tergolong Orang Baik. Dan Jangan Jadi Orang Cabul",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTJ3bmluOHAzbTVnMTMzd3NuYzRlbnFrbHd6a3J6dXI2bzc4dmlobSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/h1N8JV9p3FqgM/giphy.gif",
  },
  {
    min: 41,
    max: 60,
    description:
      "Kamu Terdeteksi Sedikit Cabul. Cepat Tobat Dan Jangan Jadi Orang Cabul",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDFybHF3enAzejd6emplZWdhMWJreHd2NmFqM2RoeXZldG9iMno0YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UHngUre4NQ98Fyghv7/giphy.gif",
  },
  {
    min: 61,
    max: 80,
    description: "Kamu Orang Cabul. Cepat Tobat Dan Berubahhh",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3BzNzhkZG14ZmcwanZpemx1MmF5dWR4bXN4bHI5M2dxd3plcm0xMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4mmH5IrQ0Jnwc/giphy.gif",
  },
  {
    min: 81,
    max: 94,
    description:
      "Kamu Orang Yang Sangat Cabul. Segera Tobat Atau Saya Lapor Damkar (Jangan Tanya Kenapa Bukan Ke Polisi)",
    gif: "https://media.giphy.com/media/TlqRQ1nowmHIs/giphy.gif",
  },
  {
    min: 95,
    max: 100,
    description: "💀💀☠️☠️",
    gif: "https://media4.giphy.com/media/jqyu31dR29Wtq/giphy.gif",
  },
];

function generateResult() {
  const percent = Math.floor(Math.random() * 101);
  const offset = circumference - (percent / 100) * circumference;
  const tier = cabulTier.find((t) => percent >= t.min && percent <= t.max);
  return { percent, offset, tier };
}

function lock() {
  isAnimating = true;
}

function unlock() {
  isAnimating = false;
}

function showNormalResult(result) {
  headerText.style.display = "none";
  inputContainer.style.display = "none";
  resultContainer.style.display = "flex";

  resultName.textContent = nameInput.value.trim();
  resultDescription.textContent = result.tier.description;
  resultGif.src = result.tier.gif;

  setTimeout(() => {
    donut.style.strokeDashoffset = result.offset;
    percentText.textContent = `${result.percent}%`;
    unlock();
  }, 300);
}

function showBadOverlay() {
  badResult.classList.add("show");
  badResult.style.opacity = "0";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
  setTimeout(() => {
    badResult.style.opacity = "1";
    document.querySelector(".bad-title").style.opacity = "0";
    document.getElementById("seeResult").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".bad-title").style.opacity = "1";
      setTimeout(() => {
        document.getElementById("seeResult").style.opacity = "1";
      }, 1100);
    }, 800);
  }, 200);
  unlock();
}

function showBadResult(result) {
  const audio = document.createElement("audio");

  headerText.style.display = "none";
  inputContainer.style.display = "none";
  resultContainer.style.display = "flex";
  audio.src = "./bad-result.mp3";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";

  setTimeout(() => {
    seeResult.style.opacity = "0";

    setTimeout(() => {
      audio.play();
      document.querySelector(".bad-title").style.opacity = "0";
      resultTitle.style.color = "#ff3b3b";
      resultName.textContent = nameInput.value.trim() + " 💀☠️☠️";
      resultName.style.color = "#e0e0e0";
      resultDescription.textContent = result.tier.description;
      resultDescription.style.color = "#e0e0e0";
      resultGif.src = result.tier.gif;
      resultGif.alt = `Hasil tes cabul ${result.percent}%`;
      percentText.style.color = "#e0e0e0";
      document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
      donut.style.strokeDashoffset = result.offset;
      donut.style.stroke = "#ff3b3b";
      percentText.textContent = `${result.percent}%`;
      document.getElementById("reset").style.backgroundColor = "#ff3b3b";
      document.getElementById("reset").textContent = "Cek Ulang☠️☠️☠️💀💀";

      setTimeout(() => {
        badResult.style.opacity = "0";

        setTimeout(() => {
          badResult.classList.remove("show");
        }, 500);
      }, 900);
    }, 800);
  }, 200);
}

document.getElementById("result").addEventListener("click", () => {
  if (isAnimating) return;

  if (!nameInput.value.trim()) {
    return Swal.fire({
      title: "Gagal!",
      text: "Nama tidak boleh kosong!",
      icon: "error",
      confirmButtonColor: "#007aff",
    });
  }

  lock();
  currentResult = generateResult();

  if (currentResult.percent >= 95) {
    showBadOverlay();
  } else {
    showNormalResult(currentResult);
  }
});

seeResult.addEventListener("click", () => {
  if (!currentResult || isAnimating) return;

  lock();
  showBadResult(currentResult);
});

document.getElementById("reset").addEventListener("click", () => {
  window.location.reload();
});
