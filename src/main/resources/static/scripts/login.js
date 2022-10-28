//check if user already logged
const loggedUser = localStorage.getItem('user_id');

function check_logged_user() {
	if (loggedUser) {
		window.location.href = 'home.html';
	}
}

function checkUser() {
	const loggedUser = localStorage.getItem('user');
	console.log(loggedUser);
}

let require_fields = ['user_name', 'password'];
let user = { user_name: '', password: '' };

// this function is used to print errors
function printError(id, msg) {
	let errmsg = document.getElementById(id);
	msg = msg.replaceAll('_', ' ').toUpperCase();
	errmsg.innerHTML = msg;
}

//this unction is used to get data from form to student object
function loadData() {
	user.user_name = document.getElementById('user_name').value.toUpperCase();
	user.password = document.getElementById('password').value;
}

//this function is used to check whether the fields are already filled
function checkFields(user) {
	let r = true;

	for (const key in user) {
		if (user[key] == '') {
			r = false;
			printError('error-' + key, key + ' is required.');
		} else {
			printError('error-' + key, '');
		}
	}

	return r;
}

//login process
document.getElementById('submit').addEventListener('click', function (e) {
	e.preventDefault();
	document.getElementById('invalid').innerHTML = '';
	loadData();
	console.log(user);

	let r1 = checkFields(user);

	if (r1) {
		const timeout = setTimeout(function logeed() {
			fetch('http://localhost:8080/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					if (data != null) {
						localStorage.setItem('user_id', data.id);
						window.location.href = 'home.html';
					} else {
						document.getElementById('invalid').innerHTML =
							'Invalid User Name or Password';
					}
				})
				.catch((err) => {
					document.getElementById('invalid').innerHTML =
						'Invalid User Name or Password';
					err.printError();
				});
		}, 1000);
	}
});
