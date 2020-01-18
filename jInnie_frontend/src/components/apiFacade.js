import MAINURL from '../settings';

function makeOptions(method, addToken, body, loggedIn) {
	console.log('ApiFacade makeOptions');
	console.log('ApiFacade makeOptions method', method);
	console.log('ApiFacade makeOptions addToken', addToken);
	console.log('ApiFacade makeOptions body', body);

	var opts = {
		method: method,
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json'
		}
	};
	if (addToken && loggedIn) {
		opts.headers['x-access-token'] = localStorage.getItem('jwtToken');
	}
	if (body) {
		opts.body = JSON.stringify(body);
	}
	console.log('opts', opts);
	return opts;
}

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject({ status: res.status, fullError: res.json() });
	}
	return res.json();
}

function apiFacade() {

	async function getItem(loggedIn, extraURL) {
		console.log('getItem loggedIn', loggedIn);

		console.log('GET');
		const options = makeOptions('GET', true, "", loggedIn);
		console.log('getItem GET url', MAINURL + extraURL);
		console.log('getItem options', options);
		const data = await fetch(MAINURL + extraURL, options).then(handleHttpErrors);
		return data;
	}

	async function addEditItem(itemBody, loggedIn, extraURL, id) {
		console.log('addEditItem itemBody', itemBody);

		console.log('addEditItem id', id);
		console.log('addEditItem loggedIn', loggedIn);

		if (id === 0 || id == undefined) {
			console.log('POST');
			const options = makeOptions('POST', true, itemBody, loggedIn);
			console.log('addEditItem POST url', MAINURL + extraURL);
			console.log('addEditItem POST itemBody', itemBody);
			console.log('addEditItem options', options);
			const data = await fetch(MAINURL + extraURL, options).then(handleHttpErrors);
			return data;
		} else {
			console.log('PUT');
			const options = makeOptions('PUT', true, itemBody, loggedIn);
			console.log('addEditItem PUT url', MAINURL + extraURL);
			console.log('addEditItem options', options);
			const data = await fetch(MAINURL + extraURL, options).then(handleHttpErrors);
			return data;
		}
	}

	async function deleteItem(loggedIn, extraURL) {
		console.log('deleteItem loggedIn', loggedIn);
		console.log('deleteItem url', MAINURL + extraURL);
		const options = makeOptions('DELETE');
		const data = await fetch(MAINURL + extraURL, options).then(handleHttpErrors);
		return data;
	}

	return {
		getItem,
		addEditItem,
		deleteItem
	};
}

export default apiFacade();
