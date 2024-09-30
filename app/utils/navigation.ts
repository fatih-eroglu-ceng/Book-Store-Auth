export const handleBackClick = (router: any) => {
  const previousPage = localStorage.getItem('previousPage');
  if (previousPage) {
    router.push(previousPage);
  } else {
    router.back();
  }
};
