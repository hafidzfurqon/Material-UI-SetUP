import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationDeletePendaftar = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['delete.pendaftar'],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`${endpoints.pendaftar.hapus}/${id}`);
      return response;
    },
    onSuccess,
    onError,
  });
};
