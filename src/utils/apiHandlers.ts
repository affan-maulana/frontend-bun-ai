export function apiErrorHandler(error: any) {
  console.error(error);
  const errorStatuses = [400, 404];
  if (error.response && errorStatuses.includes(error.response.status)) {
    const message = error?.response?.data?.message || 'Oops! Something went wrong';
    return message;
  }

  if (error.response.status == 401) {
    localStorage.clear();
    window.location.href = "/auth/login";
  }
  return 'Oops! Something went wrong';
}