const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#passwordInput").value.trim();
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      console.log(response.json());
    } else {
      alert(response.statusText);
    }
  }
};

const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

document.querySelector("#logout").addEventListener("click", logout);
