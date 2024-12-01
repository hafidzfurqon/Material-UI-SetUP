import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationLogin = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.auth.login, data);
      const {
        success,
        user_id,
        token,
        user: { nama },
      } = response.data;
      if (success) {
        sessionStorage.setItem('username', nama);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user_id', user_id);
        // sessionStorage.setItem('permission', permission);
        // sessionStorage.setItem('role', role);
      }
      console.log(response.data);
      return response;
    },
    onSuccess,
    onError,
  });
};
