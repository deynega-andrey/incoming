export enum Role {
  READ = 'Read',
  USER = 'User'
};
export const checkUserRole = (role:Role):boolean => {
  const currentUserRoles = localStorage.getItem('userRoles');
  if (currentUserRoles && Array.isArray(JSON.parse(currentUserRoles))) {
    return JSON.parse(currentUserRoles).some((item:any) => item === role);
  }
  return false;
};