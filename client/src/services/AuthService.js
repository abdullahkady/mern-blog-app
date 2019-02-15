export const authenticateUser = async (username, password) => {
  const response = await fetch("http://localhost:4000/api/auth/authenticate", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  });

  const body = await response.json();
  if (response.status === 200) {
    const { token } = body;
    localStorage.setItem("token", token);
    return true;
  } else if (response.status === 404) {
    throw new Error("You need to create an account first.");
  } else if (response.status === 401) {
    throw new Error("Invalid credentials, please try again.");
  } else {
    const { message } = body;
    throw new Error(message);
  }
};

export const signupUser = async (username, password) => {
  const response = await fetch("http://localhost:4000/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" }
  });

  if (response.status === 201) {
    return true;
  }

  const { message } = await response.json();
  throw new Error(message);
};
