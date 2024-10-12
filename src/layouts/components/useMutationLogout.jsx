import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationLogout = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['Logout'],
    mutationFn: async () => {
      const res = await axiosInstance.post(endpoints.auth.logout);
      console.log(res.data);
      sessionStorage.clear('user_id');
      sessionStorage.clear('token');
      sessionStorage.clear('permission');
      sessionStorage.clear('role');
      sessionStorage.clear('username');
      return res.data;
    },
    onSuccess,
    onError,
  });
};
