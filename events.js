const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) window.location.href = "login.html";
document.getElementById("userName").textContent = "Hi, " + user.name;

const grid = document.getElementById("eventGrid");
const searchBox = document.getElementById("search");
const sortBox = document.getElementById("sort");

function render() {
  let list = searchEvents(events, searchBox.value);
  const key = sortBox.value;
  const asc = key === "date" || key === "title";
  list = mergeSort(list, key, asc);

  if (list.length === 0) {
    grid.innerHTML = "<p>Koi event nahi mila</p>";
    return;
  }

  grid.innerHTML = "";
  list.forEach(e => {
    const full = e.seatsLeft === 0;
    const card = document.createElement("div");
    card.className = "card event-card";
    card.innerHTML =
      "<h3>" + e.title + "</h3>" +
      "<p>📅 " + e.date + "</p>" +
      "<p>📍 " + e.venue + "</p>" +
      "<span class='badge " + (full ? "red" : "green") + "'>" +
      (full ? "Full – Waitlist open" : e.seatsLeft + " seats left") + "</span>";
    card.onclick = () => window.location.href = "event.html?id=" + e.id;
    grid.appendChild(card);
  });
}

searchBox.addEventListener("input", render);
sortBox.addEventListener("change", render);
render();