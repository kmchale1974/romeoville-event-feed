document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("events.json");
    const events = await response.json();
    const container = document.getElementById("events");
    container.innerHTML = events.map(ev => `
      <div class="event">
        <strong>${ev.title}</strong><br />
        ${ev.date}<br />
        ${ev.time}<br />
        ${ev.location}<br /><br />
      </div>
    `).join("");
  } catch (error) {
    console.error("Error loading events:", error);
  }
});