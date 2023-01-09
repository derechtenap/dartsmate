// Indicates the preferred color scheme through the OS setting
// @return (string): "light" or "dark"
export const getOsTheme = () => {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

// Checks the `localStorage` for the preferred color scheme.
// If no theme is stored, the preferred scheme is selected via
// OS setting and written to the `localStorage`
// @return (string): "light" or "dark"
export const getStoredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (!storedTheme) localStorage.setItem("theme", getOsTheme());

  return storedTheme;
};

// Updates the used theme on the `localStorage`
// @return (void): void
export const setStoredTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
};

// Updates the `data-attribute` used by Bootstrap 5.3 to change
// the used colors on screen.
// @return (void): void
export const updateDataAttribute = (theme: string) => {
  const tag = document.getElementById("theme"); // `id="theme"` on the `html` tag is required!
  tag.dataset.bsTheme = theme;
};
