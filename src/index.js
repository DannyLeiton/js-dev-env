import numeral from 'numeral';
import { getUsers } from './api/userAPI';
import './index.css';

const serviceValue = numeral(1000).format('$0,0.00');
//debugger;
console.log(`Pagaría ${serviceValue} por ese servicio.`); // eslint-disable-line no-console

// Populate table of users via API call.
getUsers().then(result => {
	let usersBody = "";

	result.forEach(user => {
		usersBody += `<tr>
			<td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
			<td>${user.id}</td>
			<td>${user.firstName}</td>
			<td>${user.lastName}</td>
			<td>${user.email}</td>
		</tr>`
	});

	global.document.getElementById('users').innerHTML = usersBody;
});
