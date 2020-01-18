import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useParams, useRouteMatch } from 'react-router-dom';
import loginFacade from './loginFacade';
import uuid from 'uuid/v1';
import recipesJson from '../recipes.json';
function Recipes(props) {
	console.log('Recipes');
	console.log('Recipes loggedIn', props.loggedIn);

	let { path, url } = useRouteMatch();
	let [ isBlocking, setIsBlocking ] = useState(false);

	const [ recipes, setRecipes ] = useState([]);
	console.log('Recipes recipes', recipes);

	const getRecipeData = async () => {
		try {
			const data = await loginFacade.fetchData('/api/recipe/allrecipes');
			console.log('getRecipeData data', data);
			setRecipes(data);
		} catch (e) {
			console.log('err', e);
		}
	};

	useEffect(() => {
		getRecipeData();
	}, []);

	if (Array.isArray(recipes) && recipes[0] != undefined) {
		return (
			<div>
				<h2>Recipes</h2>
				<div style={{ textAlign: 'left' }}>
					<ul>
						{recipes.map((element) => (
							<li key={uuid()}>
								{element} <span />
								<Link to={`${url}/recipe/${element}`}>Details</Link>
							</li>
						))}
					</ul>
				</div>
				<br />
				<Switch>
					<Route exact path={path}>
						<h3>Please select a recipe.</h3>
					</Route>
					<Route path={`${path}/recipe/:id`}>
						<Details />
					</Route>
				</Switch>
			</div>
		);
	} else {
		return (
			<div>
				<h2>No Recipes yet</h2>
				{/* {hobbies.msg} */}
			</div>
		);
	}
}

function Details() {
	console.log('Details');
	console.log('recipeJSON', recipesJson); // en json fil bruges da det ikke lykkedes at få hentning af en enkelt recipe til at være stabilt
	let { id } = useParams();
	console.log('Details id', id);

	let recipe = recipesJson.find((b) => {
		console.log('b', b);
		return b.id.trim() == id.trim(); // for at fjerne space til sidst
	});
	console.log('recipe', recipe);

	console.log('id', id);
	return (
		<div>
			<h2>Recipe details</h2>
			<b>id</b>
			<p>{recipe.id}</p>
			<b>Description</b>
			<p>{recipe.description}</p>
			<b>Cooking time</b>
			<p>{recipe.prep_time}</p>

			<b>Preparation</b>
			<div>
				<ul>
					{recipe.preparaion_steps.map((element) => (
						<li key={uuid()}>
							{element} <span />
						</li>
					))}
				</ul>
			</div>
			<b>ingredients</b>
			<div>
				<ol>
					{recipe.ingredients.map((element) => (
						<li key={uuid()}>{element} <span /></li>
					))}
				</ol>
			</div>
		</div>
	);
}

export default Recipes;
