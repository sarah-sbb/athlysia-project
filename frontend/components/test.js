const [email, setEmail] = useState('');

useEffect(() => {
  if (email !== '') {
    fetch("http://localhost:3000/admins/findByEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFirstName(data.data.firstName);
          setTitle(getPageTitle(router.pathname, data.data.firstName));
        } else {
          console.error("Erreur lors de la récupération des informations de l'admin");
        }
      })
      .catch((error) => {
        console.error("Erreur de requête fetch : ", error);
      });
  }
}, [email]);