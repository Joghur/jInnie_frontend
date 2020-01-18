import URL from '../settings';

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject({ status: res.status, fullError: res.json() });
	}
	return res.json();
}

class LoginFacade {
	setToken = (token) => {
		localStorage.setItem('jwtToken', token);
	};
	getToken = () => {
		return localStorage.getItem('jwtToken');
	};
	loggedIn = () => {
		console.log('loggedIn func');
		const loggedIn = this.getToken() != null;
		return loggedIn;
	};
	logout = () => {
		localStorage.removeItem('jwtToken');
	};
	login = (user, pass) => {
		console.log('user, pass', user, pass);
		const options = this.makeOptions('POST', true, {
			username: user,
			password: pass
		});
		console.log('URL', URL);
		console.log('options', options);
		return fetch(URL + '/api/login', options)
			.then(handleHttpErrors)
			.then((res) => {
				this.setToken(res.token);
			})
			.catch((err) => {
				console.log('err', err);
				throw err;
			});
	};

	getRole = () => {
		let jwt = localStorage.getItem('jwtToken');
		let jwtData = jwt.split('.')[1];
		let decodedJwtJsonData = window.atob(jwtData);
		let decodedJwtData = JSON.parse(decodedJwtJsonData);
		return decodedJwtData.roles;
	};

	makeOptions(method, addToken, body) {
		console.log('makeOptions');
		var opts = {
			method: method,
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json'
			}
		};
		if (addToken && this.loggedIn()) {
			opts.headers['x-access-token'] = this.getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		console.log('opts', opts);
		return opts;
	}

	fetchData = async (url) => {
		console.log('fetchData');
		const options = this.makeOptions('GET', true); //True add's the token
		// const webUrl = url.replace(/ /g, "%20");
		console.log("fetchdata URL + url", URL + url);
		
		const res = await fetch(URL + url, options);
		return handleHttpErrors(res);
	};
}
const facade = new LoginFacade();
export default facade;
