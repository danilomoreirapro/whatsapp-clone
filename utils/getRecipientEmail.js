const getRecipientEmail = (users, emailLoggedIn) => {
  return users.filter((userEmail) => userEmail !== emailLoggedIn)[0];
};

export default getRecipientEmail;
