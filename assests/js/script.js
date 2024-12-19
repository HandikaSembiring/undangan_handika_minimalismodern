document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById("audio");
    const disc = document.getElementById("disc");
    let isPlaying = false;
    let currentRotation = 0;
    const rotationSpeed = 3;

    function openInvitation() {
        const quotesSection = document.getElementById('quotes');
        quotesSection.scrollIntoView({ behavior: 'smooth' });
        disc.style.display = "block";
        playDisc();
    }

    disc.addEventListener("click", function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
            requestAnimationFrame(rotateDisc);
        }
        disc.classList.toggle("paused", !isPlaying);
    });

    function playDisc() {
        audio.play();
        isPlaying = true;
        disc.style.display = "block";
        requestAnimationFrame(rotateDisc);
    }

    function rotateDisc() {
        if (isPlaying) {
            currentRotation += rotationSpeed;
            disc.style.transform = `rotate(${currentRotation}deg)`;
            requestAnimationFrame(rotateDisc);
        } else {
            disc.style.transform = `rotate(${currentRotation}deg)`;
        }
    }

    document.querySelector('.btn-open-invitation').addEventListener('click', openInvitation);
});

function toggleNavbar() {
    const navbarList = document.getElementById('navbar-list');
    navbarList.classList.toggle('show');
}

document.querySelectorAll('.navbar-list a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        const navbarList = document.getElementById('navbar-list');
        navbarList.classList.remove('show');
    });
});

window.onload = function() {
    const coverSection = document.getElementById('cover');
    coverSection.scrollIntoView({ behavior: 'smooth' });
};

const targetDate = new Date("2024-12-31T00:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector('.countdown-container').innerHTML = "Waktu Habis";
    }
}, 1000);

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function checkVisibility() {
    const quotesContainer = document.querySelector('.quotes-container');
    if (isElementInViewport(quotesContainer)) {
        quotesContainer.classList.add('visible');
        quotesContainer.classList.remove('hidden');
    }
}

window.addEventListener('scroll', checkVisibility);

document.addEventListener('DOMContentLoaded', () => {
    const quotesContainer = document.querySelector('.quotes-container');
    quotesContainer.classList.add('hidden');
    checkVisibility();
});

function saveDate() {
    const eventDate = '2024-12-31';
    const eventTitle = 'Acara Spesial';
    const eventDescription = 'Deskripsi acara';
    const eventLocation = 'Alamat Acara';

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventDate}T090000Z/${eventDate}T100000Z&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

    window.open(calendarUrl, '_blank');
    alert("Tanggal telah disimpan ke kalender!");
}

const images = document.querySelectorAll('.scrolling-gallery img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

function updateSlider() {
    const totalImages = images.length;
    const offset = -currentIndex * (100 / totalImages);
    document.querySelector('.scrolling-gallery').style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
});

updateSlider();

function submitWishes(event) {
    event.preventDefault();
    const name = document.getElementById("wishName").value.trim();
    const message = document.getElementById("wishMessage").value.trim();
    const messagesContainer = document.getElementById("messagesContainer");

    if (name && message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `<strong>${name}</strong>: ${message}`;
        messagesContainer.appendChild(messageDiv);
        document.getElementById("wishesForm").reset();
    } else {
        alert("Silakan isi semua kolom!");
    }
}

function submitRsvp(event) {
    event.preventDefault();
    const name = document.getElementById("rsvpName").value.trim();
    const email = document.getElementById("rsvpEmail").value.trim();
    const phone = document.getElementById("rsvpPhone").value.trim();
    const guestCount = document.getElementById("guestCount").value;
    const attendance = document.querySelector('input[name="attendance"]:checked');
    const message = document.getElementById("rsvpMessage").value.trim();

    if (name && email && phone && guestCount && attendance) {
        console.log(`RSVP Terkirim: ${name}, ${email}, ${phone}, ${guestCount}, ${attendance.value}, ${message}`);
        alert("RSVP telah dikirim!");
        document.getElementById("rsvp-form").reset();
    } else {
        alert("Silakan isi semua kolom!");
    }
}

function copyToClipboard() {
    var rekening = document.getElementById("nomor-rekening").innerText;
    var tempInput = document.createElement("input");
    tempInput.value = rekening;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Nomor rekening berhasil disalin: " + rekening);
}

function openMaps() {
    var alamat = document.getElementById("alamat").innerText.replace(/<br\s*\/?>/ig, ' ');
    var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(alamat);
    window.open(mapsUrl, '_blank');
}

function copyAlamat() {
    var alamat = document.getElementById("alamat").innerText;
    var tempInput = document.createElement("input");
    tempInput.value = alamat;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Alamat berhasil disalin: " + alamat);
}
