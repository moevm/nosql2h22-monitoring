const auntification = (login: string): boolean => {
  const logins: string[] = ["admin", "login"];
  if (logins.includes(login)) return true;
  return false;
};

export { auntification };
