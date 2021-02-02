import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RecipeDrinkCard() {
  const { recipesDrink, loading } = useSelector((state) => state.recipes);
  const size = recipesDrink.length;
  const maxListSize = 11;

  const returnRecipes = () => {
    if (size === 1) {
      if (recipesDrink[0].error === null) {
        // eslint-disable-next-line no-alert
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      return <Redirect to={ `/bebidas/${recipesDrink[0].idDrink}` } />;
    }
    if (size > 1) {
      return recipesDrink.map(({ strDrink, idDrink, strDrinkThumb }, index) => {
        if (index <= maxListSize) {
          return (
            <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt="recipeimage"
              />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </div>
          );
        }
        return '';
      });
    }
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      {returnRecipes()}
    </div>
  );
}

export default RecipeDrinkCard;
