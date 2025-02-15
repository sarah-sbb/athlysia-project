import { useSelector } from "react-redux";

export const getPageTitle = (pathname, firstName) => {
  const adminFirstName = useSelector((state) => state.admin.value.infoAdmin.firstName);
  const titles = {
    "/ctp-admin": "Tableau de bord",
    "/ctp-admin/groups/groups": "Groupes",
    "/ctp-admin/groups/add": "Créer un groupe",
    "/ctp-admin/participants/participants": "Participants",
    "/ctp-admin/participants/add": "Ajouter un participant",
    "/ctp-admin/events/events": "Événements",
    "/ctp-admin/events/add": "Créer un événement",
    "/adminProfile": `Bonjour ${adminFirstName}`, // Changement du titre de façon dynamique pour ajouter le prénom de l'admin
  };

  return titles[pathname] || "Check To Pic la super application !"; // Si le chemin n'est pas trouvé, affiche un titre par défaut
};