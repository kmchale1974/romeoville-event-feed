console.log("Romeoville Events script is running...");

const EVENTS_PER_PAGE = 10;
const PAGE_DURATION = 20000; // 20 seconds
const JSON_URL = 'https://kmchale1974.github.io/romeoville-event-feed/events.json';

async function fetchAndDisplayEvents() {
  try {
    const response = await fetch(JSON_URL);
    const allEvents = await response.json();
    console.log("Raw parsed events:", allEvents);

    // Filter for today and future dates
    const now = new Date();
    const upcomingEvents = allEvents.filter(event => {
      const date = new Date(event.startDate || event.dateText);
      return !isNaN(date) && date >= new Date(now.toDateString());
    });

    console.log("Filtered upcoming events:", upcomingEvents);

    const container = document.getElementById('events-container');
    if (!container) throw new Error("Missing #events-container in HTML.");

    if (upcomingEvents.length === 0) {
      container.innerHTML = '<p style="font-size: 1.5em; text-align: center;">No upcoming events found.</p>';
      return;
    }

    // Paginate and display
    let page = 0;
    const totalPages = Math.ceil(upcomingEvents.length / EVENTS_PER_PAGE);

    function showPage(p) {
      container.innerHTML = ''; // Clear
      const start = p * EVENTS_PER_PAGE;
      const end = start + EVENTS_PER_PAGE;
      const eventsToShow = upcomingEvents.slice(start, end);

      eventsToShow.forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.className = 'event';
        eventEl.innerHTML = `
          <div class="event-title">${event.title}</div>
          <div class="event-date">${event.dateText}</div>
          <div class="event-time">${event.time}</div>
          <div class="event-location">${event.location}</div>
        `;
        container.appendChild(eventEl);
      });

      page = (page + 1) % totalPages;
    }

    showPage(page);
    setInterval(() => showPage(page), PAGE_DURATION);
  } catch (err) {
    console.error("Error loading events:", err);
    const container = document.getElementById('events-container');
    if (container) {
      container.innerHTML = '<p style="font-size: 1.5em; text-align: center;">Error loading events.</p>';
    }
  }
}

fetchAndDisplayEvents();
