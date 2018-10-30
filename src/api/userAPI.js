import 'whatwg-fetch'; // What working group, this is a polyfill that assures that fetch will run in browser that don't yet have fetch support.
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() {
	return get('users');
}

export function deleteUser(id) {
	return del('users/'+id);
}

function get(uri) {
	return fetch(baseUrl + uri).then(handleErrors).then(onSuccess, onError);
}

// Can't call this function 'delete', since it is a reserved word in JS.
function del(uri) {
	const request = new Request(baseUrl + uri, {
		method: 'DELETE'
	});

	return fetch(request).then(onSuccess, onError);
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function onSuccess(res) {
	return res.json();
}

function onError(err) {
	console.log('Error: ', err); // eslint-disable-line no-console
}
