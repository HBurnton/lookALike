const createNewUser = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#userName").value.trim();
  const email = document.querySelector("#userEmail").value.trim();
  const password = document.querySelector("#userPassword").value.trim();

  if (name && email && password) {
    console.log("hello");
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#newUserForm")
  .addEventListener("submit", createNewUser);
