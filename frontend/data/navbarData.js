const navbarData = [
    {
      id: 1,
      title: "Tableau de bord",
      href: "/ctp-admin",
    },
    {
      id: 2,
      title: "Groupes",
      children: [
        { title: "Tous les groupes", href: "/ctp-admin/groups" },
        { title: "Créer un groupe", href: "/ctp-admin/groups/add" },
      ],
    },
    {
      id: 3,
      title: "Participants",
      children: [
        { title: "Tous les participants", href: "/ctp-admin/participants" },
        { title: "Ajouter un participant", href: "/ctp-admin/participants/add" },
      ],
    },
    {
      id: 4,
      title: "Évènements",
      children: [
        { title: "Tous les évènements", href: "/ctp-admin/events/events" },
        { title: "Créer un évènement", href: "/ctp-admin/events/add" },
      ],
    },
  ];
  
  export default navbarData;  