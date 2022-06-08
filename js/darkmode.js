const themeSettings = (e) => {
  const body = document.body;
  const theme = e.currentTarget.selectedOptions[0].value;

  switch (theme) {
    case "light":
      body.setAttribute("data-theme", "light");
      break;

    case "dark":
      body.setAttribute("data-theme", "dark");
      break;

    case "auto":
    default:
      body.setAttribute("data-theme", "auto");
      break;
  }
};

const themeToogler = document.querySelector("#theme-toogler");

themeToogler.addEventListener("change", themeSettings);
