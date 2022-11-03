const loggedUser = localStorage.getItem('user');

document.getElementById('logout').addEventListener('click', function (e) {
	e.preventDefault();
	localStorage.clear();
	window.location.href = 'index.html';
});

function check_logged_user() {
	if (!loggedUser) {
		window.location.href = 'index.html';
	}
}
