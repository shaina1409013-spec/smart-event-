document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) { msg.textContent = "Email ya password galat hai"; return; }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "events.html";
});