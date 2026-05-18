/**
 * Membership Registration Form Validation
 * Demonstrates: variables, arrays, functions, if/else, switch, loops, DOM manipulation, events
 *
 * PRESENTATION — MAIN JAVASCRIPT CHALLENGE:
 * Validate many field types (text, email, phone, number, selects, checkbox),
 * show custom errors in the page, and reuse the same rules on submit AND blur.
 */
(function () {
  var form = document.getElementById("membershipForm");
  if (!form) {
    return;
  }

  var validMembershipTypes = ["basic", "plus", "elite", "family"];
  var validPreferredTimes = ["early", "mid", "evening", "weekend"];
  var minAge = 16;
  var maxAge = 99;
  var minGoalsLength = 20;

  /* PRESENTATION: array of every field — looped on submit to validate the whole form */
  var fieldIds = [
    "fullName",
    "email",
    "phone",
    "age",
    "emergencyContact",
    "emergencyPhone",
    "membershipType",
    "preferredTime",
    "fitnessGoals",
    "termsAgree"
  ];

  /* PRESENTATION: regex patterns — challenge was accepting real-world email/phone formats */
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var phonePattern = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  /* PRESENTATION: challenge — checkboxes use .checked; other inputs use .value.trim() */
  function getValue(id) {
    var element = document.getElementById(id);
    if (!element) {
      return "";
    }
    if (element.type === "checkbox") {
      return element.checked;
    }
    return element.value.trim();
  }

  /* PRESENTATION: DOM manipulation — update input style + error message under each field */
  function setFieldError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + "Error");

    if (input) {
      if (message) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    }

    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearAllErrors() {
    var i = 0;
    while (i < fieldIds.length) {
      setFieldError(fieldIds[i], "");
      i++;
    }
    var formErrors = document.getElementById("formErrors");
    if (formErrors) {
      formErrors.hidden = true;
      formErrors.innerHTML = "";
    }
  }

  function validateFullName(value) {
    if (!value) {
      return "Full name is required.";
    }
    if (value.length < 2) {
      return "Name must be at least 2 characters.";
    }
  }

  function validateEmail(value) {
    if (!value) {
      return "Email address is required.";
    }
    if (!emailPattern.test(value)) {
      return "Please enter a valid email (e.g. name@example.com).";
    }
  }

  /* PRESENTATION: phone challenge — strip non-digits AND match pattern (555) 123-4567, etc. */
  function validatePhoneValue(value, fieldLabel) {
    if (!value) {
      return fieldLabel + " is required.";
    }
    var digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      return fieldLabel + " must contain 10–11 digits.";
    }
    if (!phonePattern.test(value)) {
      return "Use format: (555) 123-4567 or 555-123-4567.";
    }
  }

  function validatePhone(value) {
    return validatePhoneValue(value, "Phone number");
  }

  function validateAge(value) {
    if (!value) {
      return "Age is required.";
    }
    var age = parseInt(value, 10);
    if (isNaN(age)) {
      return "Age must be a number.";
    }
    if (age < minAge || age > maxAge) {
      return "Age must be between " + minAge + " and " + maxAge + ".";
    }
  }

  function validateEmergencyContact(value) {
    if (!value) {
      return "Emergency contact name is required.";
    }
    if (value.length < 2) {
      return "Emergency contact name must be at least 2 characters.";
    }
  }

  function validateEmergencyPhone(value) {
    return validatePhoneValue(value, "Emergency contact phone");
  }

  function validateMembershipType(value) {
    if (!value) {
      return "Please select a membership type.";
    }
    var isValid = false;
    var i = 0;
    while (i < validMembershipTypes.length) {
      if (validMembershipTypes[i] === value) {
        isValid = true;
        break;
      }
      i++;
    }
    if (!isValid) {
      return "Invalid membership type selected.";
    }
  }

  function validatePreferredTime(value) {
    if (!value) {
      return "Please select a preferred training time.";
    }
    var found = false;
    for (var j = 0; j < validPreferredTimes.length; j++) {
      if (validPreferredTimes[j] === value) {
        found = true;
        break;
      }
    }
    if (!found) {
      return "Invalid time selection.";
    }
  }

  function validateFitnessGoals(value) {
    if (!value) {
      return "Fitness goals are required.";
    }
    if (value.length < minGoalsLength) {
      return "Please write at least " + minGoalsLength + " characters about your goals.";
    }
  }

  function validateTerms(checked) {
    if (!checked) {
      return "You must agree to the terms and policies.";
    }
  }

  /* PRESENTATION: switch — one function routes each field to the correct validator */
  function getFieldError(fieldId) {
    switch (fieldId) {
      case "fullName":
        return validateFullName(getValue("fullName"));
      case "email":
        return validateEmail(getValue("email"));
      case "phone":
        return validatePhone(getValue("phone"));
      case "age":
        return validateAge(getValue("age"));
      case "emergencyContact":
        return validateEmergencyContact(getValue("emergencyContact"));
      case "emergencyPhone":
        return validateEmergencyPhone(getValue("emergencyPhone"));
      case "membershipType":
        return validateMembershipType(getValue("membershipType"));
      case "preferredTime":
        return validatePreferredTime(getValue("preferredTime"));
      case "fitnessGoals":
        return validateFitnessGoals(getValue("fitnessGoals"));
      case "termsAgree":
        return validateTerms(getValue("termsAgree"));
      default:
        return undefined;
    }
  }

  /* PRESENTATION: blur validation — check one field without re-validating the entire form */
  function validateField(fieldId) {
    var msg = getFieldError(fieldId);
    setFieldError(fieldId, msg || "");
    return !msg;
  }

  /* PRESENTATION: loop + errors array — collect every failed rule, then show summary */
  function validateForm(shouldScroll) {
    clearAllErrors();

    var errors = [];
    var index = 0;

    while (index < fieldIds.length) {
      var fieldId = fieldIds[index];
      var msg = getFieldError(fieldId);
      if (msg) {
        setFieldError(fieldId, msg);
        errors.push(msg);
      }
      index++;
    }

    if (errors.length > 0) {
      displayFormErrors(errors, shouldScroll);
      return false;
    }

    return true;
  }

  /* PRESENTATION: build error list HTML and inject into #formErrors (DOM modification) */
  function displayFormErrors(errorMessages, shouldScroll) {
    var formErrors = document.getElementById("formErrors");
    if (!formErrors) {
      return;
    }

    var html = "<strong>Please fix the following errors:</strong><ul>";
    var k = 0;
    while (k < errorMessages.length) {
      html += "<li>" + errorMessages[k] + "</li>";
      k++;
    }
    html += "</ul>";

    formErrors.innerHTML = html;
    formErrors.hidden = false;

    if (shouldScroll) {
      formErrors.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function getMembershipLabel(value) {
    switch (value) {
      case "basic":
        return "Basic ($39/mo)";
      case "plus":
        return "Plus ($59/mo)";
      case "elite":
        return "Elite ($89/mo)";
      case "family":
        return "Family ($119/mo)";
      default:
        return value;
    }
  }

  function showSuccess() {
    var successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    form.reset();
    clearAllErrors();
  }

  /* PRESENTATION: submit event — preventDefault stops page reload; then run full validation */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.hidden = true;
    }

    if (validateForm(true)) {
      var memberName = getValue("fullName");
      var plan = getMembershipLabel(getValue("membershipType"));
      console.log("Registration submitted:", memberName, plan);
      showSuccess();
    }
  });

  form.addEventListener("reset", function () {
    clearAllErrors();
    var successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.hidden = true;
    }
  });

  /* PRESENTATION: blur event — give instant feedback when user leaves a field */
  var inputs = form.querySelectorAll("input, select, textarea");
  var n = 0;
  while (n < inputs.length) {
    inputs[n].addEventListener("blur", function () {
      var fieldId = this.id;
      if (!fieldId) {
        return;
      }
      validateField(fieldId);
    });
    n++;
  }
})();
