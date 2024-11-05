import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationDeleteUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['delete.user'],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`${endpoints.users.hapus}/${id}`);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
