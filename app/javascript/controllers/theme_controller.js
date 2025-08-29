import { Controller } from "@hotwired/stimulus"

// Conecta con data-controller="theme"
export default class extends Controller {
  static targets = ["icon"]

  connect() {
    this.loadTheme()
  }

  toggle() {
    let currentTheme = document.body.getAttribute("data-theme")
    let newTheme = currentTheme === "dark" ? "light" : "dark"

    this.setTheme(newTheme)
  }

  setTheme(theme) {
    document.body.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
    this.updateIcon(theme)
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      this.setTheme(savedTheme)
    } else {
      // Detecta el sistema por defecto
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      this.setTheme(prefersDark ? "dark" : "light")
    }
  }

  updateIcon(theme) {
    if (!this.hasIconTarget) return
    this.iconTarget.textContent = theme === "dark" ? "☀️" : "🌙"
  }
}
