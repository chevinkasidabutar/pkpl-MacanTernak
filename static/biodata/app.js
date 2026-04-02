const body = document.body;
const btnLight = document.getElementById("btn-light");
const btnDark = document.getElementById("btn-dark");

function setTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark-mode", isDark);
  // Persist theme hanya untuk member yang boleh mengubah.
  if (body.dataset.isMember === "true") {
    localStorage.setItem("theme", theme);
  }
  if (btnLight) btnLight.classList.toggle("active", !isDark);
  if (btnDark) btnDark.classList.toggle("active", isDark);
}

const isMember = body.dataset.isMember === "true";
// Non-member/unauthenticated: tidak boleh ubah theme.
// Kita juga tidak menerapkan theme tersimpan agar tampil konsisten.
if (!isMember) {
  body.classList.remove("dark-mode");
} else {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

if (isMember) {
  if (btnLight) {
    btnLight.addEventListener("click", () => setTheme("light"));
  }

  if (btnDark) {
    btnDark.addEventListener("click", () => setTheme("dark"));
  }
}

document.addEventListener("click", (event) => {
  const editBtn = event.target.closest(".status-edit-btn");
  if (editBtn) {
    const card = editBtn.closest(".status-card");
    if (!card) return;
    const form = card.querySelector(".status-edit-form");
    const textEl = card.querySelector(".status-text");
    const input = form ? form.querySelector('input[name="content"]') : null;
    if (form && textEl && input) {
      const current = textEl.textContent.trim();
      const updated = window.prompt("Edit status:", current);
      if (updated === null) return;
      const next = updated.trim();
      if (!next) return;
      input.value = next;
      form.submit();
    }
    return;
  }
});
