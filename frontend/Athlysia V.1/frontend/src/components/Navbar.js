import React from 'react';
function Navbar () {
  return (
    <aside className="sidebar">
        <nav className="navbar">
        <div className="accordion-container">
            <div className="accordion-item">
                <div className="accordion-header">
                    Tableau de bord
                </div>
            </div>
            <div className="accordion-item">
                <div className="accordion-header">
                    Groupes
                </div>
                <div className="accordion-content">
                    <a href="/" className="sub-item">Tous les groupes</a>
                    <a href="/" className="sub-item">Ajouter un groupe</a>
                </div>
            </div>
        
            <div className="accordion-item">
                <div className="accordion-header">Participants
                </div>
                <div className="accordion-content">
                    <a href="/" className="sub-item">Tous les participants</a>
                    <a href="/" className="sub-item">Ajouter un participant</a>
                </div>
            </div>
        
            <div className="accordion-item">
                <div className="accordion-header">
                    Événements
                </div>
                <div className="accordion-content">
                    <a href="/" className="sub-item">Tous les événements</a>
                    <a href="/" className="sub-item">Créer un événement</a>
                </div>
            </div>
        </div>
    </nav>
  </aside>
  )
}
export default Navbar;

