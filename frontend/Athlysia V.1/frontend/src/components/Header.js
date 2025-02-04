import React from 'react';
function Header () {
  return (
    <header className="header">
          <div className="header-logo">
            logo
            <img src="img/logo-white.webp" alt=""/>
          </div>
          <div className="header-title">
            <h1>Titre de la page</h1>
          </div>
          <div className="header-profil">
            <img src="img/profil.webp" alt=""/>
            <a href="/">Mon compte</a>
          </div>
    </header>
  )
}
export default Header;