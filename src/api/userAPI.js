import 'whatwg-fetch'; // What working group
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() {
	return get('users');
}

export function deleteUser(id) {
	return del('users/'+id);
}

function get(uri) {
	return fetch(baseUrl + uri).then(onSuccess, onError);
}

// Can't call this function 'delete', since it is a reserved word in JS.
function del(uri) {
	const request = new Request(baseUrl + uri, {
		method: 'DELETE'
	});

	return fetch(request).then(onSuccess, onError);
}

function onSuccess(res) {
	return res.json();
}

function onError(err) {
	console.log('Error: ', err); // eslint-disable-line no-console
}
