export const listAllPosts = async () => {
  const response = await fetch("http://localhost:4000/api/posts/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")
    }
  });

  if (response.status === 200) {
    const posts = await response.json();
    return posts;
  }
};

export const createPost = async text => {
  const response = await fetch("http://localhost:4000/api/posts/", {
    method: "POST",
    body: JSON.stringify({ post: text }),
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")
    }
  });

  if (response.status === 201) {
    return true;
  }
  return false;
};
