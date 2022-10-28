const loggedUser = localStorage.getItem('user_id');

//logout
document.getElementById('logout').addEventListener('click', function (e) {
	e.preventDefault();

	localStorage.clear();
	window.location.href = 'index.html';
});

//check if user already logged
function check_logged_user() {
	if (!loggedUser) {
		window.location.href = 'index.html';
	}
}
