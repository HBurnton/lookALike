const agree = async (event) => {
  const currentAgree = document.getElementById("numberAgree");
  const post = document.querySelector("section");
  const id = post.getAttribute("data-postid");

  const response = await fetch(`/api/posts/agree/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  currentAgree.innerText = parseInt(currentAgree.innerText) + 1;
};

const disagree = async (event) => {
  const currentDisagree = document.getElementById("numberDisagree");
  const post = document.querySelector("section");
  const id = post.getAttribute("data-postid");

  const response = await fetch(`/api/posts/disagree/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  currentDisagree.innerText = parseInt(currentDisagree.innerText) + 1;
};

document.querySelector("#yesButton").addEventListener("click", agree);
document.querySelector("#noButton").addEventListener("click", disagree);
