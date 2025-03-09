import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function apiErrorHandler(error: any): string {

  const errorStatuses = [400, 404];
  if (error instanceof AxiosError) {
    if (error.response && errorStatuses.includes(error.response.status)) {
      
      const message = error.response.data?.message || 'Oops! Something went wrong';
      toast.error(message);
      return message;
    }
    if (error.response?.status === 401) {
      toast.error('User is not authorized');
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000); // Delay of 2 seconds
      return 'Unauthorized';
    }
  }
  toast.error('Oops! Something went wrong');
  return 'Oops! Something went wrong';
}