const createNewPost = async (event) => {
  event.preventDefault();
  console.log("hello");

  const title = document.querySelector("#postTitle").value.trim();
  const body = document.querySelector("#postBody").value.trim();
  const urlOne = document.querySelector("#urlOneAddress").value.trim();
  const urlTwo = document.querySelector("#urlTwoAddress").value.trim();
  console.log(title, body, urlOne, urlTwo);

  if (title && body && urlOne && urlTwo) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        imageOneUrl: urlOne,
        imageTwoUrl: urlTwo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create project");
    }
  }
};

document
  .querySelector("#submitNewPost")
  .addEventListener("submit", createNewPost);
