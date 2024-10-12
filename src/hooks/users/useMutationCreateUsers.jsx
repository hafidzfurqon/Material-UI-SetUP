import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationCreateUsers = ({ onSuccess }) => {
  return useMutation({
    mutationKey: ['mutate.users'],
    mutationFn: async (formData) => {
      const response = await axiosInstance.post(endpoints.users.tambah, formData);
      return response.data;
    },
    onSuccess,
  });
};
