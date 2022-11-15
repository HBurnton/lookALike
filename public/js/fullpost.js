const agree = async (event) => {
  const currentAgree = document.getElementById("numberAgree");
  const post = document.querySelector("section");
  const id = post.getAttribute("data-postid");

  const response = await fetch(`/api/posts/agree/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  const response2 = await response.json();

  currentAgree.innerText = response2.numberAgree;
};

const disagree = async (event) => {
  const currentDisagree = document.getElementById("numberDisagree");
  const post = document.querySelector("section");
  const id = post.getAttribute("data-postid");

  const response = await fetch(`/api/posts/disagree/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  const response2 = await response.json();
  response2.numberDisagree;

  currentDisagree.innerText = response2.numberDisagree;
};

document.querySelector("#yesButton").addEventListener("click", agree);
document.querySelector("#noButton").addEventListener("click", disagree);
