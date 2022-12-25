export const auntification = (login: string): boolean => {
  const logins: string[] = ["admin", "patient"];
  return logins.includes(login);
};
