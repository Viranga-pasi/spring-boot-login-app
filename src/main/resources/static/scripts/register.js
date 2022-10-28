//check if user already logged
const loggedUser = localStorage.getItem('user_id');

function check_logged_user() {
	if (loggedUser) {
		window.location.href = 'home.html';
	}
}

let require_fields = [
	'first_name',
	'last_name',
	'user_name',
	'password',
	'confirm_password',
];
let user = {
	first_name: '',
	last_name: '',
	user_name: '',
	password: '',
	confirm_password: '',
};

// this function is used to print errors
function showError(id, msg) {
	let err_msg = document.getElementById(id);
	msg = msg.replaceAll('_', ' ').toUpperCase();
	err_msg.innerHTML = msg;
}

//check only numbers
function onlyNumber(str) {
	for (let i = 0; i < str.length; i++) {
		if (Number.isInteger(parseInt(str.charAt(i))) == false) {
			return false;
		}
	}
	return true;
}

//check if char in string is a number
function isNumber(character) {
	if (typeof character !== 'string') {
		return false;
	}
	if (character.trim() === '') {
		return false;
	}
	return !isNaN(character);
}

//this unction is used to get data from form to student object
function loadData() {
	user.first_name = document.getElementById('first_name').value;
	user.first_name =
		user.first_name.charAt(0).toUpperCase() +
		user.first_name.slice(1).toLowerCase();

	user.last_name = document.getElementById('last_name').value;
	user.last_name =
		user.last_name.charAt(0).toUpperCase() +
		user.last_name.slice(1).toLowerCase();

	user.user_name = document.getElementById('user_name').value.toUpperCase();
	user.password = document.getElementById('password').value;
	user.confirm_password = document.getElementById('confirm_password').value;

	console.log(user);
}

//this function is used to check whether the fields are already filled
function checkFields(user) {
	let r = true;

	for (const key in user) {
		if (user[key] == '') {
			r = false;
			showError('error-' + key, key + ' is required.');
		} else {
			if (key == 'user_name') {
				if (user[key].length != 6 || !onlyNumber(user[key].substr(1))) {
					r = false;
					showError('error-' + key, 'Invalid user name');
				} else {
					showError('error-' + key, '');
				}
			} else if (key == 'password' || key == 'confirm_password') {
				if (user[key].length != 8) {
					r = false;
					showError('error-' + key, key + ' must contain 8 characters');
				} else {
					//check uppercase letter
					let uppercaseLetter = false;

					for (i = 0; i < 8; i++) {
						if (
							user[key].substring(i, i + 1) ==
								user[key].substring(i, i + 1).toUpperCase() &&
							!onlyNumber(user[key])
						) {
							uppercaseLetter = true;
							break;
						}
					}
					// console.log(uppercaseLetter)
					if (uppercaseLetter == false) {
						r = false;
						showError(
							'error-' + key,
							key + ' must have at least one uppercase letter'
						);
					} else {
						//check number
						let num = false;

						for (i = 0; i < 8; i++) {
							if (isNumber(user[key][i])) {
								num = true;
								break;
							}
						}
						// console.log(num)
						if (num == false) {
							r = false;
							showError('error-' + key, key + ' must have at least one number');
						} else {
							showError('error-' + key, '');
						}
					}
				}
			} else {
				showError('error-' + key, '');
			}
		}
	}

	if (
		r == true &&
		user['password'].localeCompare(user['confirm_password']) != 0
	) {
		showError('error-password', 'passwords are not matched');
		showError('error-confirm_password', 'passwords are not matched');
		r = false;
	}

	return r;
}

//signup process
document.getElementById('register').addEventListener('click', function (e) {
	e.preventDefault();
	document.getElementById('invalid').innerHTML = '';
	loadData();

	// console.log(user);

	let r1 = checkFields(user);

	// r1=false;
	if (r1) {
		const timeout = setTimeout(function logeed() {
			fetch('http://localhost:8080/addUser', {
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
					if (data) {
						localStorage.setItem('user_id', data.id);
						window.location.href = 'home.html';
					} else {
						document.getElementById('invalid').innerHTML =
							'User Already Exists';
					}
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}, 1000);
	}
});
