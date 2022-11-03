const loggedUser = localStorage.getItem('user');

function check_logged_user() {
	if (loggedUser) {
		window.location.href = 'home.html';
	}
}

let user = {
	first_name: '',
	last_name: '',
	user_name: '',
	password: '',
	confirm_password: '',
};

// show errors
function showErrorMsg(id, msg) {
	let err_msg = document.getElementById(id);
	msg = msg.replaceAll('_', ' ').toUpperCase();
	err_msg.innerHTML = msg;
}

// check only numbers
function onlyNumber(str) {
	for (let i = 0; i < str.length; i++) {
		if (Number.isInteger(parseInt(str.charAt(i))) == false) {
			return false;
		}
	}
	return true;
}

// check if char in string is a number
function isNumber(character) {
	if (typeof character !== 'string') {
		return false;
	}
	if (character.trim() === '') {
		return false;
	}
	return !isNaN(character);
}

// get form data
function getFormData() {
	user.first_name = document.getElementById('first_name').value;

	user.last_name = document.getElementById('last_name').value;

	user.user_name = document.getElementById('user_name').value.toUpperCase();
	user.password = document.getElementById('password').value;
	user.confirm_password = document.getElementById('confirm_password').value;

	console.log(user);
}

// check fields
function checkFields(user) {
	let valid = true;

	for (const key in user) {
		if (user[key] == '') {
			valid = false;
			showErrorMsg('error-' + key, key + ' is required.');
		} else {
			if (key == 'user_name') {
				if (user[key].length != 6 || !onlyNumber(user[key].substr(1))) {
					valid = false;
					showErrorMsg('error-' + key, 'Invalid user name');
				} else {
					showErrorMsg('error-' + key, '');
				}
			} else if (key == 'password' || key == 'confirm_password') {
				if (user[key].length != 8) {
					valid = false;
					showErrorMsg('error-' + key, key + ' must contain 8 characters');
				} else {
					// check uppercase letter
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
						valid = false;
						showErrorMsg(
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
							valid = false;
							showErrorMsg(
								'error-' + key,
								key + ' must have at least one number'
							);
						} else {
							showErrorMsg('error-' + key, '');
						}
					}
				}
			} else {
				showErrorMsg('error-' + key, '');
			}
		}
	}

	if (
		valid == true &&
		user['password'].localeCompare(user['confirm_password']) != 0
	) {
		showErrorMsg('error-password', 'passwords are not matched');
		showErrorMsg('error-confirm_password', 'passwords are not matched');
		valid = false;
	}

	return valid;
}

document.getElementById('register').addEventListener('click', function (e) {
	e.preventDefault();
	document.getElementById('invalid').innerHTML = '';
	getFormData();

	// console.log(user);

	let validate = checkFields(user);

	// validate=false;
	if (validate) {
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
						localStorage.setItem('user', data.id);
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
