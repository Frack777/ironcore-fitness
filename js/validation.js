/**
 * Membership Registration Form Validation
 * Demonstrates: variables, arrays, functions, if/else, switch, loops, DOM manipulation, events
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

  var fieldIds = [
    "fullName",
    "email",
    "phone",
    "age",
    "emergencyContact",
    "membershipType",
    "preferredTime",
    "fitnessGoals",
    "termsAgree"
  ];

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var phonePattern = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

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

  function validatePhone(value) {
    if (!value) {
      return "Phone number is required.";
    }
    var digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      return "Phone must contain 10–11 digits.";
    }
    if (!phonePattern.test(value)) {
      return "Use format: (555) 123-4567 or 555-123-4567.";
    }
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
      return "Emergency contact is required.";
    }
    if (value.length < 5) {
      return "Please include name and relationship.";
    }
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

  function validateForm() {
    clearAllErrors();

    var errors = [];
    var fullName = getValue("fullName");
    var email = getValue("email");
    var phone = getValue("phone");
    var age = getValue("age");
    var emergencyContact = getValue("emergencyContact");
    var membershipType = getValue("membershipType");
    var preferredTime = getValue("preferredTime");
    var fitnessGoals = getValue("fitnessGoals");
    var termsAgree = getValue("termsAgree");

    var checks = [
      { id: "fullName", msg: validateFullName(fullName) },
      { id: "email", msg: validateEmail(email) },
      { id: "phone", msg: validatePhone(phone) },
      { id: "age", msg: validateAge(age) },
      { id: "emergencyContact", msg: validateEmergencyContact(emergencyContact) },
      { id: "membershipType", msg: validateMembershipType(membershipType) },
      { id: "preferredTime", msg: validatePreferredTime(preferredTime) },
      { id: "fitnessGoals", msg: validateFitnessGoals(fitnessGoals) },
      { id: "termsAgree", msg: validateTerms(termsAgree) }
    ];

    var index = 0;
    while (index < checks.length) {
      var check = checks[index];
      if (check.msg) {
        setFieldError(check.id, check.msg);
        errors.push(check.msg);
      }
      index++;
    }

    if (errors.length > 0) {
      displayFormErrors(errors);
      return false;
    }

    return true;
  }

  function displayFormErrors(errorMessages) {
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
    formErrors.scrollIntoView({ behavior: "smooth", block: "nearest" });
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

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.hidden = true;
    }

    if (validateForm()) {
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

  var inputs = form.querySelectorAll("input, select, textarea");
  var n = 0;
  while (n < inputs.length) {
    inputs[n].addEventListener("blur", function () {
      var fieldId = this.id;
      if (!fieldId) {
        return;
      }
      validateForm();
    });
    n++;
  }
})();
