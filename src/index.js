import numeral from 'numeral';
import { getUsers, deleteUser } from './api/userAPI';
import './index.css';

const serviceValue = numeral(1000).format('$0,0.00');
//debugger;
console.log(`Pagaría ${serviceValue} por ese servicio.`); // eslint-disable-line no-console

// Populate table of users via API call.
getUsers().then(result => {
	console.log('result', result); // eslint-disable-line no-console

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

	const deleteLinks = global.document.getElementsByClassName('deleteUser');

	/* Must use array.from to create a real array form a DOM collection
	   getElementsByClassName only returns an "array like" object */
	Array.from(deleteLinks, link => {
		link.onclick = (event) => {
			const element = event.target;
			event.preventDefault();
			deleteUser(element.attributes["data-id"].value);
			const row = element.parentNode.parentNode;
			row.parentNode.removeChild(row);
		};
	});
}).catch((err) => console.log('Data was not ready! ', err)); // eslint-disable-line no-console
