const STORAGE_KEY = "ai-capstone-settings";

const DEFAULT_SETTINGS = {
  displayName: "",
  email: "",
  theme: "light",
  language: "en",
  timezone: "UTC",
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
  profileVisibility: "team",
  analytics: false,
};

const form = document.getElementById("settings-form");
const resetBtn = document.getElementById("reset-btn");
const toast = document.getElementById("toast");

/**
 * Load saved settings from localStorage, falling back to defaults.
 */
function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Populate form fields with the given settings object.
 */
function populateForm(settings) {
  Object.entries(settings).forEach(([key, value]) => {
    const field = form.elements[key];
    if (!field) return;

    if (field.type === "checkbox") {
      field.checked = Boolean(value);
    } else {
      field.value = value;
    }
  });
}

/**
 * Read current form values into a settings object.
 */
function getFormData() {
  const data = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    const field = form.elements[key];
    data[key] = field?.type === "checkbox" ? field.checked : value;
  }

  // Checkboxes that are unchecked are omitted from FormData
  form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (!(checkbox.name in data)) {
      data[checkbox.name] = false;
    }
  });

  return data;
}

/**
 * Validate required fields and show inline errors.
 * Returns true if the form is valid.
 */
function validateForm() {
  let isValid = true;

  const displayName = form.elements.displayName;
  const email = form.elements.email;
  const displayNameError = document.getElementById("display-name-error");
  const emailError = document.getElementById("email-error");

  displayName.classList.remove("invalid");
  email.classList.remove("invalid");
  displayNameError.textContent = "";
  emailError.textContent = "";

  if (!displayName.value.trim()) {
    displayName.classList.add("invalid");
    displayNameError.textContent = "Display name is required.";
    isValid = false;
  }

  if (!email.value.trim()) {
    email.classList.add("invalid");
    emailError.textContent = "Email address is required.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add("invalid");
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  return isValid;
}

/**
 * Show a brief toast notification.
 */
function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.hidden = false;

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

/**
 * Save settings to localStorage.
 */
function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// Initialize form with saved or default settings
populateForm(loadSettings());

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    showToast("Please fix the errors before saving.", true);
    return;
  }

  const settings = getFormData();
  saveSettings(settings);
  showToast("Settings saved successfully.");
});

resetBtn.addEventListener("click", () => {
  populateForm(DEFAULT_SETTINGS);
  localStorage.removeItem(STORAGE_KEY);
  showToast("Settings reset to defaults.");
});
