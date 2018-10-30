import 'whatwg-fetch'; // What working group
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() {
	return get('users');
}

function get(uri) {
	return fetch(baseUrl + uri).then(onSuccess, onError);
}

function onSuccess(res) {
	return res.json();
}

function onError(err) {
	console.log(err); // eslint-disable-line no-console
}
