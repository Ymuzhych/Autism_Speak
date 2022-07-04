async function deleteFormHandler(event) {
  event.preventDefault();
// get the post id from the url
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });
// if the delete action is successful, redirect to the dashboard page, otherwise display the error
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);
