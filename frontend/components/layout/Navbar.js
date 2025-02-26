import React, { useState } from "react";
import Link from "next/link";
import navbarData from "../../data/navbarData"; // Importe les données du menu
import styles from "../../styles/Navbar.module.css"; 

// Composant Navbar optimisé
function Navbar() {
  const [activeAccordion, setActiveAccordion] = useState(null); // Activer/désactiver une section
  const [activeSubItem, setActiveSubItem] = useState(""); // Suivre le sous-élément actif

  // Gérer les clics sur une section de l'accordéon
  const toggleAccordion = (id) => {
    if (activeAccordion === id) {
      setActiveAccordion(null); // Ferme la section si elle est déjà ouverte
    } else {
      setActiveAccordion(id); // Ouvre la section sélectionnée
    }
  };

  // Gérer les clics sur un élément du sous-menu
  const handleSubItemClick = (href) => {
    setActiveSubItem(href); // Marque le sous-élément actif
  };

  return (
    <nav className={styles.mainNavbar}>
      <div className={styles.accordionContainer}>
        {navbarData.map((menu) => (
          <div key={menu.id} className={styles.accordionItem}>
            {/* En-tête de l'accordéon */}
            {menu.href ? (
              <Link href={menu.href}>
                <div className={styles.accordionHeader}>
                  {menu.title}
                </div>
              </Link>
            ) : (
              <div
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(menu.id)}
              >
                {menu.title}
              </div>
            )}

            {/* Contenu de l'accordéon (sous-menus) */}
            {menu.children && (
              <div
                className={`${styles.accordionContent} ${
                  activeAccordion === menu.id ? styles.active : ""
                }`}
                style={{
                  maxHeight: activeAccordion === menu.id ? "200px" : "0", // Permet de gérer la hauteur
                }}
              >
                {menu.children.map((child, index) => (
                  <div key={index} className={styles.subItem}>
                    <Link href={child.href}>
                      <div
                        className={`${styles.subItemContent} ${
                          activeSubItem === child.href ? styles.activeSubItem : ""
                        }`}
                        onClick={() => handleSubItemClick(child.href)}
                      >
                        {child.title}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;