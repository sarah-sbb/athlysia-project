import React, { useState, useEffect } from "react";
import Link from 'next/Link';
import styles from '../../styles/Navbar.module.css';

function Navbar() {
  const [activeAccordion, setActiveAccordion] = useState(null); // État actif pour les accordéons
  const [activeSubItem, setActiveSubItem] = useState(""); // État actif pour les sous-menus

  // Fonction pour gérer les clics sur un élément de l'accordéon
  const handleAccordionClick = (index) => {
    // Si l'élément cliqué est déjà actif, on le referme
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index); // Sinon, on l'ouvre
    }
  };

  // Fonction pour gérer les clics sur un sous-élément
  const handleSubItemClick = (href) => {
    setActiveSubItem(href); // Mettre à jour l'état local
  };

  return (
    <nav className={styles.mainNavbar}>
      <div className={styles.accordionContainer}>
        {/* Accordéon 1 */}
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleAccordionClick(1)}
          >
            <Link href="/ctp-admin">Tableau de bord</Link>
          </div>
        </div>

        {/* Accordéon 2 */}
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleAccordionClick(2)}
          >
            Groupes
          </div>
          <div
            className={`${styles.accordionContent} ${
              activeAccordion === 2 ? styles.active : ""
            }`}
            style={{
              maxHeight: activeAccordion === 2 ? "200px" : "0", // Ajustement dynamique de la hauteur
            }}
          >
            <div
              href="/"
              className={`${styles.subItem} ${
                activeSubItem === "/" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/")}
            >
              <Link href="/ctp-admin/groups">Tous les groupes</Link>
            </div>
            <div
              href="/add-group"
              className={`${styles.subItem} ${
                activeSubItem === "/add-group" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/add-group")}
            >
              <Link href="/ctp-admin/groups">Créer un groupe</Link>
            </div>
          </div>
        </div>

        {/* Accordéon 3 */}
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleAccordionClick(3)}
          >
            Participants
          </div>
          <div
            className={`${styles.accordionContent} ${
              activeAccordion === 3 ? styles.active : ""
            }`}
            style={{
              maxHeight: activeAccordion === 3 ? "200px" : "0",
            }}
          >
            <div
              href="/participants"
              className={`${styles.subItem} ${
                activeSubItem === "/participants" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/participants")}
            >
              <Link href="/ctp-admin/participants">Tous les participants</Link>
            </div>
            <div
              href="/add-participant"
              className={`${styles.subItem} ${
                activeSubItem === "/add-participant"
                  ? styles.activeSubItem
                  : ""
              }`}
              onClick={() => handleSubItemClick("/add-participant")}
            >
              <Link href="/ctp-admin/participants">Ajouer un participants</Link>
            </div>
          </div>
        </div>

        {/* Accordéon 4 */}
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleAccordionClick(4)}
          >
            Evenements
          </div>
          <div
            className={`${styles.accordionContent} ${
              activeAccordion === 4 ? styles.active : ""
            }`}
            style={{
              maxHeight: activeAccordion === 4 ? "200px" : "0",
            }}
          >
            <div
              href="/events"
              className={`${styles.subItem} ${
                activeSubItem === "/events" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/events")}
            >
              <Link href="/ctp-admin/events">Tous les évènements</Link>
            </div>
            <div
              href="/add-event"
              className={`${styles.subItem} ${
                activeSubItem === "/add-event" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/add-event")}
            >
              <Link href="/ctp-admin/events">Créer un évènement</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;