// Alle Skripte werden ausgeführt, sobald das HTML-Dokument vollständig geladen ist.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. COUNTDOWN-TIMER ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const partyDate = new Date(2025, 8, 4, 19, 0, 0).getTime(); // Monat ist 0-basiert (8 = September)

        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = partyDate - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "Die Party hat begonnen!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <span>${days}d</span> 
                <span>${hours}h</span> 
                <span>${minutes}m</span> 
                <span>${seconds}s</span>
            `;
        }, 1000);
    }

    // --- 2. "ZUM KALENDER HINZUFÜGEN" LINK ---
    const calendarBtn = document.getElementById('addToCalendar');
    if (calendarBtn) {
        const eventTitle = "Abschlussparty Deutschkurs";
        const eventLocation = "In unserem Kursraum, Cagua";
        const eventStartDate = "20250904T230000Z"; // 19:00 Caracas (UTC-4) ist 23:00 UTC
        const eventEndDate = "20250905T020000Z";   // 22:00 Caracas (UTC-4) ist 02:00 UTC am Folgetag
        const eventDetails = 'Großes Finale unseres Deutschkurses! Bringt etwas Süßes oder Salziges mit. Wir freuen uns!';
        
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventStartDate}/${eventEndDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;
        
        calendarBtn.href = googleCalendarUrl;
    }

    // --- INTERAKTIVE TIMELINE (MODAL) ---
    const milestones = document.querySelectorAll('.milestone');
    const modal = document.getElementById('milestone-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeModalBtn = document.getElementById('modal-close-btn');

    milestones.forEach(milestone => {
        milestone.addEventListener('click', () => {
            const title = milestone.getAttribute('data-modal-title');
            const text = milestone.getAttribute('data-modal-text');
            
            modalTitle.textContent = title;
            modalText.textContent = text;
            modal.classList.remove('hidden');
        });
    });

    const closeModal = () => modal.classList.add('hidden');

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(); // Schließt Modal bei Klick auf den Hintergrund
    });


    // --- ZUSAGE-FORMULAR (RSVP) ---
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpConfirmation = document.getElementById('rsvp-confirmation');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Verhindert das Neuladen der Seite
            const guestName = document.getElementById('guest-name').value;
            
            // Verstecke das Formular und zeige die Bestätigung
            rsvpForm.classList.add('hidden');
            rsvpConfirmation.textContent = `Vielen Dank, ${guestName}! Wir freuen uns riesig auf dich! 😊`;
            rsvpConfirmation.classList.remove('hidden');
        });
    }


    // --- DYNAMISCHER PARTIKEL-HINTERGRUND (tsParticles) ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load({
            id: "tsparticles",
            options: {
                background: {
                    color: { value: "transparent" } 
                },
                fpsLimit: 60,
                particles: {
                    number: {
                        value: 50,
                        density: { enable: true, value_area: 800 }
                    },
                    color: {
                        value: ["#3b82f6", "#cccccc"] 
                    },
                    shape: { type: "circle" },
                    opacity: {
                        value: { min: 0.2, max: 0.6 },
                        animation: { enable: true, speed: 0.5, sync: false }
                    },
                    size: {
                        value: { min: 1, max: 4 }
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: "top",
                        straight: false,
                        outModes: { default: "out" }
                    }
                },
                interactivity: { 
                    events: { onHover: { enable: false }, onClick: { enable: false } },
                },
                detectRetina: true,
            }
        });
    }
});

