// New Post Form Handler
async function newFormHandler(event) {
  event.preventDefault();
// Get the post title and post text
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
// use the add a new post POST route to add the post 
  const response = await fetch(`/api/posts`, {
     //id is added from the session information in the route
    method: "POST",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
//Reload the page is response made
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
  // Event Listener for the new post submit button
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
