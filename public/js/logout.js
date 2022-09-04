const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
let el = document.querySelector('#logout');
if (el) {
  document.querySelector('#logout').addEventListener('click', logout);
}
// document.querySelector('#logout').addEventListener('click', logout);
