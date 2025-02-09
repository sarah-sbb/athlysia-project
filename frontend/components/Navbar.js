import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from '../styles/Navbar.module.css';

function Navbar() {
  const [activeAccordion, setActiveAccordion] = useState(null); // État actif pour les accordéons
  const [activeSubItem, setActiveSubItem] = useState(""); // État actif pour les sous-menus

  // Charger le sous-menu actif depuis localStorage au démarrage
  useEffect(() => {
    const savedActiveSubItem = localStorage.getItem("activeSubItem");
    if (savedActiveSubItem) {
      setActiveSubItem(savedActiveSubItem);
    }
  }, []);

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
    localStorage.setItem("activeSubItem", href); // Enregistrer dans localStorage
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
            <Link href="/dashboard">Tableau de bord</Link>
          </div>
        </div>

        {/* Accordéon 2 */}
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleAccordionClick(2)}
          >
            <Link href="./pages/dashboard/groups">Groupes</Link>
          </div>
          <div
            className={`${styles.accordionContent} ${
              activeAccordion === 2 ? styles.active : ""
            }`}
            style={{
              maxHeight: activeAccordion === 2 ? "200px" : "0", // Ajustement dynamique de la hauteur
            }}
          >
            <a
              href="/"
              className={`${styles.subItem} ${
                activeSubItem === "/" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/")}
            >
              <Link href="./pages/dashboard/groups">Tous les groupes</Link>
            </a>
            <a
              href="/add-group"
              className={`${styles.subItem} ${
                activeSubItem === "/add-group" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/add-group")}
            >
              <Link href="./pages/dashboard/groups">Créer un groupe</Link>
            </a>
          </div>
        </div>

        {/* Accordéon 3 */}
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleAccordionClick(3)}
          >
            <Link href="./pages/dashboard/participants">Participants</Link>
          </div>
          <div
            className={`${styles.accordionContent} ${
              activeAccordion === 3 ? styles.active : ""
            }`}
            style={{
              maxHeight: activeAccordion === 3 ? "200px" : "0",
            }}
          >
            <a
              href="/participants"
              className={`${styles.subItem} ${
                activeSubItem === "/participants" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/participants")}
            >
              <Link href="./pages/dashboard/participants">Tous les participants</Link>
            </a>
            <a
              href="/add-participant"
              className={`${styles.subItem} ${
                activeSubItem === "/add-participant"
                  ? styles.activeSubItem
                  : ""
              }`}
              onClick={() => handleSubItemClick("/add-participant")}
            >
              <Link href="./pages/dashboard/participants">Ajouer un participants</Link>
            </a>
          </div>
        </div>

        {/* Accordéon 4 */}
        <div className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleAccordionClick(4)}
          >
            <Link href="./pages/dashboard/events">Evenements</Link>
          </div>
          <div
            className={`${styles.accordionContent} ${
              activeAccordion === 4 ? styles.active : ""
            }`}
            style={{
              maxHeight: activeAccordion === 4 ? "200px" : "0",
            }}
          >
            <a
              href="/events"
              className={`${styles.subItem} ${
                activeSubItem === "/events" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/events")}
            >
              <Link href="./pages/dashboard/events">Tous les évènements</Link>
            </a>
            <a
              href="/add-event"
              className={`${styles.subItem} ${
                activeSubItem === "/add-event" ? styles.activeSubItem : ""
              }`}
              onClick={() => handleSubItemClick("/add-event")}
            >
              <Link href="./pages/dashboard/events">Créer un évènement</Link>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;