import React from 'react';
function Content () {
  return (
    <div className="content">
        <div>
            <div className="navbar-tool">
                <div className="dropdown">
                    <button className="dropdown-btn">Actions groupées</button>
                    <div className="dropdown-content">
                      <a href="/">Modifier</a>
                      <a href="/">Supprimer</a>
                    </div>
                  </div>
                  <div className="search-container">
                    <input type="text" className="search-bar" placeholder="Rechercher..."/>
                    <button className="search-btn">🔍</button>
                </div>                          
            </div>
        </div>
        <table className="group-table">
            <thead>
                <tr>
                    <th><input type="checkbox" className="select-all"/></th>
                    <th>
                        Titre 
                        <span className="sort-arrow">&#8597;</span>
                    </th>
                    <th>
                        Auteur 
                        <span className="sort-arrow">&#8597;</span>
                    </th>
                    <th>
                        Nombre de participants 
                        <span className="sort-arrow">&#8597;</span>
                    </th>
                    <th>
                        Date de création 
                        <span className="sort-arrow">&#8597;</span>
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="group-row">
                    <td><input type="checkbox"/></td>
                    <td>Groupe A</td>
                    <td>Auteur 1</td>
                    <td>25</td>
                    <td>01/01/2023</td>
                    <td><button className="edit-btn">Modifier</button> <button className="delete-btn">Supprimer</button></td>
                </tr>
                <tr className="group-row" style={{ backgroundColor: '#CAD2FC' }}>
                    <td><input type="checkbox"/></td>
                    <td>Groupe B</td>
                    <td>Auteur 2</td>
                    <td>30</td>
                    <td>05/02/2023</td>
                    <td><button className="edit-btn">Modifier</button> <button className="delete-btn">Supprimer</button></td>
                </tr>
                <tr className="group-row" style={{ backgroundColor: '#fff'}}>
                    <td><input type="checkbox"/></td>
                    <td>Groupe C</td>
                    <td>Auteur 3</td>
                    <td>15</td>
                    <td>10/03/2023</td>
                    <td><button className="edit-btn">Modifier</button> <button className="delete-btn">Supprimer</button></td>
                </tr>
            </tbody>
        </table>                
    </div>
  )
}

export default Content;