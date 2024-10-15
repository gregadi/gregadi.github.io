// Toggle Dark Mode and Light Mode
document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("[data-theme-toggle]");
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

    // calculates current theme setting based on user's stored preference or system preference
    let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

    // responsible for updating the theme attribute on <html> element
    updateThemeOnHtmlEl({ theme: currentThemeSetting });

    // event listener for when the button is clicked
    button.addEventListener("click", function() {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

        // store new theme to localStorage
        localStorage.setItem("theme", newTheme);
        updateThemeOnHtmlEl({ theme: newTheme });

        currentThemeSetting = newTheme;
    });

    // Function that checks if the user has previously selected a theme and stored it. If so, that theme is used
    function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
        if (localStorageTheme !== null) {
            return localStorageTheme;
        }
        if (systemSettingDark.matches) {
            return "dark";
        }
        return "light";
    }

    // Function that sets data-theme attribute to <html> element
    function updateThemeOnHtmlEl({ theme }) {
        document.querySelector("html").setAttribute("data-theme", theme);
    }
});
