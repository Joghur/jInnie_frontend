import React, { useState, useEffect } from 'react';
import { BrowserRouter as Prompt, Link, Switch, Route, useParams, useRouteMatch } from 'react-router-dom';
import uuid from 'uuid/v1';
import recipesJson from '../recipes.json';
import ShowMenuPlan from './ShowMenuPlan';

function MenuPlan(props) {
	console.log('MenuPlan');
	console.log('MenuPlan loggedIn', props.loggedIn);

	const emptySearch = { recipeWord: '', cookingTime: 0 };
	const [ search, setSearch ] = useState({ ...emptySearch });
	let [ isBlocking, setIsBlocking ] = useState(false);
	let [ recipeSearch, setRecipeSearch ] = useState([]);
	const [ menuPlan, setMenuPlan ] = useState([]);
	console.log('MenuPlan menuPlan', menuPlan);

	const updateMenuPlan = (index) => {
		console.log('updateMenuPlan - index', index);
		setMenuPlan(index);
		setSearch(emptySearch);
	};

	const searchRecipeChange = (evt) => {
		console.log('searchRecipeChange');
		const newSearch = { ...search };
		const target = evt.target;
		const id = evt.target.id;
		setIsBlocking(target.value.length > 0);
		setSearch({ ...newSearch, [id]: target.value });
		console.log('searchRecipeChange search', search);
		let recipe = recipesJson.filter((b) => {
			console.log('b.id', b.id);
			console.log('search.recipeWord', search.recipeWord);
			return b.id.trim().toLowerCase().includes(search.recipeWord); // for at fjerne space til sidst
		});
		console.log('searchRecipeChange recipe', recipe);
		setRecipeSearch(recipe);
	};

	return (
		<div>
			<ShowMenuPlan menuPlan={menuPlan} apiFacade={props.apiFacade} />
			<form className="form-horizontal">
				<Prompt
					when={isBlocking}
					message={(location) => `You have unsaved work. Sure you want to go to ${location.pathname}?`}
				/>
				<div className="form-group">
					<div className="col-sm-9">
						<br />
						<p>Search recipes</p>
						<input
							type="text"
							className="form-control"
							placeholder="Recipe Word"
							id="recipeWord"
							onChange={searchRecipeChange}
							value={search.name}
						/>
						<br />
						{/* <p>Cooking time (in minutes)</p>
						<input
							type="number"
							className="form-control"
							placeholder="Cooking time"
							id="cookingTime"
							onChange={searchRecipeChange}
							value={search.cookingTime}
						/> */}
					</div>
				</div>
			</form>
			<div>
				<br />
				<RecipeSearchResult recipeSearch={recipeSearch} updateMenuPlan={updateMenuPlan} menuPlan={menuPlan} />
			</div>
		</div>
	);
}

function RecipeSearchResult({ recipeSearch, updateMenuPlan, menuPlan }) {
	console.log('RecipeSearchResult');
	console.log('RecipeSearchResult recipeSearch', recipeSearch);
	console.log('RecipeSearchResult updateMenuPlan', updateMenuPlan);
	console.log('RecipeSearchResult menuPlan', menuPlan);

	let { path, url } = useRouteMatch();

	const addToMenuPlan = (evt) => {
		console.log('addToMenuPlan');
		const id = evt.target.id; //recipe name
		console.log('addToMenuPlan id', id);
		menuPlan.push(id);
		console.log('RecipeSearchResult addToMenuPlan menuPlan ', menuPlan);

		updateMenuPlan(menuPlan);
	};

	if (Array.isArray(recipeSearch) && recipeSearch[0] != undefined) {
		return (
			<div>
				<br />
				<h2>Recipes found</h2>
				<div>
					<ul>
						{recipeSearch.map((element) => (
							<li key={uuid()}>
								<div>
									<p>
										{element.id}
										<Link to={`${url}/recipe/${element.id}`}>( Details - </Link>
										<Link id={element.id} onClick={addToMenuPlan}>
											Add to plan)
										</Link>
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
				<Switch>
					<Route path={`${path}/recipe/:id`}>
						<RecipeSearchResultDetail />
					</Route>
				</Switch>
			</div>
		);
	} else {
		return (
			<div>
				<b />
				<h2>No Recipes yet</h2>
			</div>
		);
	}
}

function RecipeSearchResultDetail() {
	console.log('RecipeSearchResultDetail');

	let { id } = useParams();

	let recipeSearchDetail = recipesJson.find((b) => {
		console.log('b.id', b.id);
		console.log('id', id);
		return b.id.trim() == id.trim(); // for at fjerne space til sidst
	});
	console.log('RecipeSearchResultDetail recipeSearchDetail', recipeSearchDetail);

	if (recipeSearchDetail != undefined) {
		return (
			<div>
				<br />
				<h2>Recipe details</h2>
				<b>id</b>
				<p>{recipeSearchDetail.id}</p>
				<b>Description</b>
				<p>{recipeSearchDetail.description}</p>
				<b>Cooking time</b>
				<p>{recipeSearchDetail.prep_time}</p>

				<b>Preparation</b>
				<div>
					<ul>
						{recipeSearchDetail.preparaion_steps.map((element) => (
							<li key={uuid()}>
								{element} <span />
							</li>
						))}
					</ul>
				</div>
				<b>ingredients</b>
				<div>
					<ol>
						{recipeSearchDetail.ingredients.map((element) => (
							<li key={uuid()}>
								{element} <span />
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<h2>No Recipes yet</h2>
			</div>
		);
	}
}

export default MenuPlan;
