/** Вытаскивает из юрл число
 *
 */
// @ts-ignore
export const returnedRegistryNumber = (location: any) => {
  const el: any = location.pathname;
  let registryNumber = '';
  for (const index in el) {
    if ( parseInt(el[index]) ) {
      registryNumber += el[index]
    }
  }
  parseInt(registryNumber);
  return registryNumber;
}