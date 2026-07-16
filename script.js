const STORAGE_KEY = "ai-capstone-settings";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const form = document.getElementById("settings-form");
const saveBtn = document.getElementById("save-btn");
const toast = document.getElementById("toast");

const fields = {
  name: {
    input: document.getElementById("name"),
    error: document.getElementById("name-error"),
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
  },
  password: {
    input: document.getElementById("password"),
    error: document.getElementById("password-error"),
  },
};

/**
 * Return a validation message for a field, or an empty string if valid.
 */
function getFieldError(fieldName, value) {
  const trimmedValue = value.trim();

  if (fieldName === "name") {
    if (!trimmedValue) {
      return "Name is required.";
    }
    return "";
  }

  if (fieldName === "email") {
    if (!trimmedValue) {
      return "Email is required.";
    }
    if (!EMAIL_PATTERN.test(trimmedValue)) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  if (fieldName === "password") {
    if (!value) {
      return "Password is required.";
    }
    if (value.length < MIN_PASSWORD_LENGTH) {
      return "Password must be at least 8 characters.";
    }
    return "";
  }

  return "";
}

/**
 * Validate one field and update its error message and visual state.
 */
function validateField(fieldName, showError = true) {
  const { input, error } = fields[fieldName];
  const message = getFieldError(fieldName, input.value);

  if (showError && message) {
    input.classList.add("invalid");
    error.textContent = message;
  } else if (!message) {
    input.classList.remove("invalid");
    error.textContent = "";
  }

  return message === "";
}

/**
 * Validate all fields and enable or disable the Save button.
 */
function updateFormState(showErrors = false) {
  const results = Object.keys(fields).map((fieldName) =>
    validateField(fieldName, showErrors)
  );

  saveBtn.disabled = !results.every(Boolean);
  return results.every(Boolean);
}

/**
 * Load saved name and email from localStorage.
 */
function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const settings = JSON.parse(stored);
    fields.name.input.value = settings.name || "";
    fields.email.input.value = settings.email || "";
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Persist name and email only. Password is never stored.
 */
function saveSettings() {
  const settings = {
    name: fields.name.input.value.trim(),
    email: fields.email.input.value.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
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

// Initialize form
loadSettings();
updateFormState(false);

Object.keys(fields).forEach((fieldName) => {
  const { input } = fields[fieldName];

  input.addEventListener("input", () => {
    updateFormState(false);
  });

  input.addEventListener("blur", () => {
    validateField(fieldName, true);
    updateFormState(false);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isValid = updateFormState(true);
  if (!isValid) {
    showToast("Please fix the errors before saving.", true);
    return;
  }

  saveSettings();
  fields.password.input.value = "";
  updateFormState(false);
  showToast("Settings saved successfully.");
});
