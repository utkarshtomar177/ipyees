document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("phoneModal");
  const phoneStep = document.getElementById("phoneStep");
  const otpStep = document.getElementById("otpStep");
  const closeModal = document.getElementById("closeModal");
  const closeOtpModal = document.getElementById("closeOtpModal");
  
  const getStartedButtons = document.querySelectorAll(
    'a[href="#contact"], a.button-primary-green'
  );
  
  const tradeLinks = document.querySelectorAll('a[href="./forms/trade.html"]');
  
  const phoneForm = document.getElementById("phoneForm");
  const otpForm = document.getElementById("otpForm");
  const resendBtn = document.getElementById("resendBtn");
  const countdownEl = document.getElementById("countdown");
  const otpInputs = document.querySelectorAll(".otp-input");
  
  function isUserVerified() {
    return localStorage.getItem("phoneVerified") === "true";
  }
  
  function getVerifiedPhone() {
    return localStorage.getItem("verifiedPhone") || "";
  }
  
  function setUserAsVerified(phoneNumber) {
    localStorage.setItem("phoneVerified", "true");
    localStorage.setItem("verifiedPhone", phoneNumber);
    
    updateGetStartedButtons();
  }
  
  function updateGetStartedButtons() {
    if (isUserVerified()) {
      const phoneNumber = getVerifiedPhone();
      const afterLoginElements = document.querySelectorAll(".afterlogin");
      
      afterLoginElements.forEach(element => {
        element.textContent = phoneNumber;
      });
    }
  }
  
  updateGetStartedButtons();

  otpInputs.forEach((input, index) => {
    input.addEventListener("keyup", function (e) {
      if (
        e.key !== "Backspace" &&
        input.value.length === 1 &&
        index < otpInputs.length - 1
      ) {
        otpInputs[index + 1].focus();
      }
      const otpComplete = Array.from(otpInputs).every(
        (input) => input.value.length === 1
      );
      if (otpComplete) {
        document.querySelector("#otpForm .submit-btn").classList.add("ready");
      } else {
        document
          .querySelector("#otpForm .submit-btn")
          .classList.remove("ready");
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const paste = e.clipboardData.getData("text");
      if (paste.match(/^\d+$/) && paste.length <= otpInputs.length) {
        for (let i = 0; i < paste.length; i++) {
          if (index + i < otpInputs.length) {
            otpInputs[index + i].value = paste[i];
          }
        }
        const nextIndex = Math.min(index + paste.length, otpInputs.length - 1);
        otpInputs[nextIndex].focus();
      }
    });
  });

  getStartedButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (isUserVerified()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        openModal();
      }
    });
  });
  
  tradeLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      
      if (isUserVerified()) {
        window.location.href = "./forms/trade.html";
      } else {
        openModal();
        
        localStorage.setItem("redirectAfterVerification", "./forms/trade.html");
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      closeModalFn();
    });
  }

  if (closeOtpModal) {
    closeOtpModal.addEventListener("click", function () {
      closeModalFn();
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFn();
    }
  });

  if (phoneForm) {
    phoneForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const phoneNumber = "+91" + document.getElementById('phoneNumber').value.trim();

      try {
        const res = await fetch("http://localhost:3000/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: phoneNumber }),
        });

        const result = await res.json();
        if (result.success) {
          phoneStep.classList.remove("active");
          otpStep.classList.add("active");
          startCountdown();
        } else {
          alert("Failed to send OTP");
        }
      } catch (err) {
        console.error(err);
        alert("Error sending OTP");
      }
    });
  }

  if (otpForm) {
    otpForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const otpValue = Array.from(otpInputs)
        .map((input) => input.value)
        .join("");
      
      const phoneNumber = "+91" + document.getElementById("phoneNumber").value.trim();

      try {
        const res = await fetch("http://localhost:3000/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: phoneNumber, otp: otpValue }),
        });

        const result = await res.json();
        if (result.success) {
          setUserAsVerified(phoneNumber);
          
          alert("Verification successful!");
          closeModalFn();
          
          const redirectURL = localStorage.getItem("redirectAfterVerification");
          if (redirectURL) {
            localStorage.removeItem("redirectAfterVerification");
            window.location.href = redirectURL;
          }
        } else {
          alert("Invalid OTP");
        }
      } catch (err) {
        console.error(err);
        alert("Error verifying OTP");
      }
    });
  }

  if (resendBtn) {
    resendBtn.addEventListener("click", async function () {
      if (!resendBtn.disabled) {
        const phoneNumber = "+91" + document.getElementById("phoneNumber").value.trim();
        
        try {
          const res = await fetch("http://localhost:3000/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: phoneNumber }),
          });
          
          const result = await res.json();
          if (result.success) {
            console.log("Resending OTP...");
            startCountdown();
            resendBtn.disabled = true;
          } else {
            alert("Failed to resend OTP");
          }
        } catch (err) {
          console.error(err);
          alert("Error resending OTP");
        }
      }
    });
  }

  function startCountdown() {
    let countdown = 30;
    countdownEl.textContent = countdown;
    const timer = setInterval(function () {
      countdown--;
      countdownEl.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(timer);
        resendBtn.disabled = false;
        document.querySelector(".resend-timer").style.display = "none";
      }
    }, 1000);
  }

  function openModal() {
    if (modal) {
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("active");
      }, 10);
    }
  }

  function closeModalFn() {
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => {
        modal.style.display = "none";
        otpStep.classList.remove("active");
        phoneStep.classList.add("active");
        
        otpInputs.forEach(input => {
          input.value = '';
        });
      }, 300);
    }
  }
});