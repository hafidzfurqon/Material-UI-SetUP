import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useDeletePendaftar = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['delete.pendaftar'],
    mutationFn: async (id) => {
      const response = await axiosInstance(`${endpoints.pendaftar.hapus}/${id}`);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
