import CONFIG from "../config";

export const listAllPosts = async () => {
  const response = await fetch(CONFIG.API_BASE + "/posts", {
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
  const response = await fetch(CONFIG.API_BASE + "/posts", {
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
