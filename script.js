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
  audio.src =
    "https://rr1---sn-npoe7nlz.googlevideo.com/videoplayback?expire=1765901539&ei=gzBBadeOIdSX4t4P-92ocQ&ip=112.140.167.62&id=o-AP3SLaWwO8rgytaKZDuU8c-qcbiLcFCJ7GoWljlr-IbU&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=129&gcr=id&bui=AYUSA3BSp5_vmzYxIBM19NgH7qgkNf3WOiJ_PJwYGcI4Cm8K05W1LRw30SBAj2GmMv055wEM3z4e_vtI&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=LoM-Dks5R2_r5zQRtCrZrUER&rqh=1&gir=yes&clen=4168292&dur=252.101&lmt=1726309572217716&keepalive=yes&lmw=1&fexp=51557447,51565115,51565681,51580970&c=TVHTML5&sefc=1&txp=5532434&n=dJq5aPINmtrOLA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgN-_dnn6OW4Q8QfcNrLW0eA7J5eM-J4oyhg7NibjwQ2wCIDl4Nn7A9vNeEdcYH66tkY1QXarPfZrihqZzZbJzI2n3&rm=sn-2uuxa3vh-n0cs7l,sn-npozs7e&rrc=79,104&req_id=8a6f9b6720b7a3ee&rms=rdu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1765879956,&mh=OU&mip=103.224.124.165&mm=29&mn=sn-npoe7nlz&ms=rdu&mt=1765879740&mv=m&mvi=1&pl=24&lsparams=cps,ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRQIhALx4RJGfjSYqzm2qNlkJnuzszjmrUHRraHcgVk3rwmrRAiBgMK5Jzy_ROlQJ1TIED653pRA7z8C4cQ8-9yq3i-4ODA%3D%3D";

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
