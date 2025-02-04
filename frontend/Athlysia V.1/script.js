document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");

      header.addEventListener("click", function () {
          if (!content) return;

          accordionItems.forEach(accItem => {
              const accContent = accItem.querySelector(".accordion-content");
              if (accItem !== item && accContent) {
                  accItem.classList.remove("active");
                  accContent.style.maxHeight = null;
              }
          });

          if (content.style.maxHeight) {
              content.style.maxHeight = null;
              item.classList.remove("active");
          } else {
              content.style.maxHeight = content.scrollHeight + "px";
              item.classList.add("active");
          }
      });
  });

  // Gestion des sub-items actifs
  const subItems = document.querySelectorAll(".sub-item");

  // Vérifie si un sous-menu actif est déjà stocké
  const activeSubItem = localStorage.getItem("activeSubItem");
  if (activeSubItem) {
      const activeLink = document.querySelector(`.sub-item[href="${activeSubItem}"]`);
      if (activeLink) {
          activeLink.classList.add("active-sub-item");
      }
  }

  subItems.forEach(subItem => {
      subItem.addEventListener("click", function (e) {
          // Supprime l'ancienne classe active
          subItems.forEach(item => item.classList.remove("active-sub-item"));

          // Ajoute la classe active au sous-menu sélectionné
          this.classList.add("active-sub-item");

          // Stocke l'URL pour conserver l'état après rechargement
          localStorage.setItem("activeSubItem", this.getAttribute("href"));
      });
  });
});
