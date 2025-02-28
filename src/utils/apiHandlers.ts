export function apiErrorHandler(error: any) {
  console.error(error);
  const errorStatuses = [400, 404, 401];
  if (error.response && errorStatuses.includes(error.response.status)) {
    const message = error?.response?.data?.message || 'Oops! Something went wrong';
    return message;
  }
  return 'Oops! Something went wrong';
}