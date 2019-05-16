export const signInHandler = (e, { companyName, setCompanyName, setIsSignedIn, setModalOpen }) => {
  const { target: { name, value } } = e;
  e.preventDefault();
  switch (name) {
    case 'companyName':
    setCompanyName(value);
      break;
    case 'signIn':
      localStorage.setItem('companyName', companyName)
      setIsSignedIn(true);
      setModalOpen(false);
      break;
    default:
  };

}