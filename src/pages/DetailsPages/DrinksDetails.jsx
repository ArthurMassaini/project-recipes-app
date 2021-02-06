import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../../actions';
import * as API from '../../services/foodApi';
import FavoriteButtonDrink from '../../components/FavoriteButtons/FavoriteButtonDrink';
import CopyButton from '../../components/CopyButton';
import StartRecipeButtonDrink from
  '../../components/StartRecipeButtons/StartRecipeButtonDrink';

function DrinksDetails({ match, location }) {
  const [response, setResponse] = useState([]);
  const [recommendation, setRecommedation] = useState([]);
  const { id } = match.params;
  const dispatch = useDispatch();
  const { loading, detailsDrink } = useSelector((state) => state.recipes);
  const retrieveIngredients = () => {
    const ingredients = [];
    const maxIngredients = 15;
    for (let index = 1; index <= maxIngredients; index += 1) {
      if (
        detailsDrink[0][`strIngredient${index}`] !== null
        && detailsDrink[0][`strIngredient${index}`] !== ''
      ) {
        ingredients.push(
          `${detailsDrink[0][`strIngredient${index}`]}: ${
            detailsDrink[0][`strMeasure${index}`]
          }`,
        );
      }
    }
    return ingredients;
  };
  const fetchRecommendation = async () => {
    const data = await API.searchInitial();
    setResponse(data.meals);
  };

  const horizontalMakerFunc = () => {
    const firstItem = 0;
    const lastItem = 6;
    const array = [...response.slice(firstItem, lastItem)];
    setRecommedation(array);
  };

  useEffect(() => {
    dispatch(Actions.retrieveDrinkDetailsById(id));
    fetchRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    horizontalMakerFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  if (loading || !detailsDrink) return <h1>Loading...</h1>;
  return (
    <div>
      {detailsDrink.map(
        ({
          strAlcoholic,
          strDrinkThumb,
          strDrink,
          strCategory,
          strInstructions,
        }) => (
          <div key={ strDrink }>
            <img
              className="header-image"
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt="recipeImg"
            />
            <div>
              <CopyButton location={ location.pathname } />
              <FavoriteButtonDrink id={ id } />
            </div>
            <h1 data-testid="recipe-title">{strDrink}</h1>
            <p data-testid="recipe-category">
              {`Categoria: ${strCategory} ${strAlcoholic}`}
            </p>
            <h4>Ingredientes</h4>
            <ul>
              {retrieveIngredients().map((ingredients, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ ingredients }
                >
                  {ingredients}
                </li>
              ))}
            </ul>
            <p data-testid="instructions">{`Instruções: ${strInstructions}`}</p>
            <div className="recommendation">
              {recommendation.map((element, index) => (
                <div
                  className="recommendation-card"
                  data-testid={ `${index}-recomendation-card` }
                  key={ element.idMeal }
                >
                  <img
                    className="recommendation-image"
                    src={ element.strMealThumb }
                    alt="recipeImg"
                  />
                  <p data-testid={ `${index}-recomendation-title` }>
                    {element.strMeal}
                  </p>
                </div>
              ))}
            </div>
            <StartRecipeButtonDrink
              id={ id }
              ingredients={ retrieveIngredients() }
            />
          </div>
        ),
      )}
    </div>
  );
}

DrinksDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
