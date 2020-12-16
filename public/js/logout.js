const logout = async () => {
  // TODO: Add a comment describing the functionality of this expression
  // Calls the route that logs the user out
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // TODO: Add a comment describing the functionality of this statement
    // Reroutes to the login page
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
