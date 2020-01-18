import React, { useState } from 'react';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import facade from './components/loginFacade';
import LogIn from './components/LogIn';
import Recipes from './components/Recipes';
import MenuPlan from './components/MenuPlan';

function App({ apiFacade }) {
	console.log('App');
	const token = localStorage.getItem('jwtToken');
	const [ loggedIn, setLoggedIn ] = useState(token ? true : false);

	const logout = () => {
		console.log('App - logout');
		facade.logout();
		setLoggedIn(false);
		console.log('loggedIn', loggedIn);
	};
	const login = (user, pass) => {
		console.log('App - login');
		facade.login(user, pass).then((res) => setLoggedIn(true));
		console.log('loggedIn', loggedIn);
	};
	return (
		<div>
			<Router>
				<div>
					<Header loggedIn={loggedIn} />
					<Switch>
						<Route path="/recipes">
							<Recipes apiFacade={apiFacade} loggedIn={loggedIn} />
						</Route>
						<Route path="/menu">
							<MenuPlan apiFacade={apiFacade} loggedIn={loggedIn} />
						</Route>
						<Route path="/log">
							<LogIn facade={facade} loggedIn={loggedIn} login={login} logout={logout} />
						</Route>
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

function Header({ loggedIn }) {
	console.log('Header');
	return (
		<div>
			<ul className="header">
				{loggedIn && (
					<li>
						<NavLink activeClassName="active" to="/menu">
							Menu Plan
						</NavLink>
					</li>
				)}
				{loggedIn && (
					<li>
						<NavLink activeClassName="active" to="/recipes">
							Recipes
						</NavLink>
					</li>
				)}
				<li>
					<NavLink activeClassName="active" to="/log">
						{loggedIn ? <div>Logout</div> : <div>Login</div>}
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

function NoMatch() {
	console.log('NoMatch');
	return <div>Login details in uploadet exam file</div>;
}

export default App;
