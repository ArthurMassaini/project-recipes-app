import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Profile() {
  const eraseLocalStorage = () => {
    localStorage.clear();
  };
  const profileItems = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header title="Profile" />
        <h4 data-testid="profile-email">{ email }</h4>
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Link>
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Link>
        <Link
          to="/"
          onClick={ () => eraseLocalStorage() }
          data-testid="profile-logout-btn"
        >
          Sair
        </Link>
        <MenuInferior />
      </div>
    );
  };
  return (profileItems());
}
export default Profile;
