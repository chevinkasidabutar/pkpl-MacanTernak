// TODO: Isi daftar email anggota kelompok di sini.
// Contoh:
// const ALLOWED_MEMBER_EMAILS = ["anggota1@gmail.com", "anggota2@gmail.com"];
const ALLOWED_MEMBER_EMAILS = [];

const authControlsEl = document.getElementById("auth-controls");
const customizationSection = document.getElementById("customization-section");
const bgColorPicker = document.getElementById("bg-color-picker");
const fontSelect = document.getElementById("font-select");

let currentUser = null;

function renderLoggedOut() {
  customizationSection.hidden = true;
  authControlsEl.innerHTML = "";

  const btn = document.createElement("button");
  btn.className = "primary";
  btn.textContent = "Login dengan Google";
  btn.addEventListener("click", () => {
    alert(
      "Integrasi Google Login belum dikonfigurasi.\n" +
        "Nanti diisi dengan Firebase Authentication (Google Sign-In)."
    );
  });

  authControlsEl.appendChild(btn);
}

function isMemberEmail(email) {
  return ALLOWED_MEMBER_EMAILS.map((e) => e.toLowerCase()).includes(
    email.toLowerCase()
  );
}

function renderLoggedIn(user) {
  authControlsEl.innerHTML = "";

  const info = document.createElement("div");
  info.className = "user-info";
  info.textContent = user.email || "User tanpa email";

  const roleBadge = document.createElement("span");
  roleBadge.className = "badge";
  if (user.email && isMemberEmail(user.email)) {
    roleBadge.textContent = "Anggota (boleh edit)";
    customizationSection.hidden = false;
  } else {
    roleBadge.textContent = "Bukan anggota (hanya lihat)";
    customizationSection.hidden = true;
  }

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.addEventListener("click", () => {
    currentUser = null;
    renderLoggedOut();
  });

  info.appendChild(document.createTextNode(" "));
  info.appendChild(roleBadge);

  authControlsEl.appendChild(info);
  authControlsEl.appendChild(logoutBtn);
}

bgColorPicker.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--bg-color", e.target.value);
});

fontSelect.addEventListener("change", (e) => {
  document.body.style.fontFamily = e.target.value;
});

renderLoggedOut();

