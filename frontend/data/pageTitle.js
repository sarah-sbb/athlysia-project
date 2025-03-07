export const getPageTitle = (pathname) => {

  const titles = {
    "/ctp-admin": "Tableau de bord",
    "/ctp-admin/groups": "Groupes",
    "/ctp-admin/groups/add": "Créer un groupe",
    "/ctp-admin/participants": "Participants",
    "/ctp-admin/participants/add": "Ajouter un participant",
    "/ctp-admin/events/events": "Événements",
    "/ctp-admin/events/add": "Créer un événement",
    "/adminProfile": `Mon profil`,
  };

  return titles[pathname] || "Check To Pic la super application !"; // Si le chemin n'est pas trouvé, affiche un titre par défaut
};