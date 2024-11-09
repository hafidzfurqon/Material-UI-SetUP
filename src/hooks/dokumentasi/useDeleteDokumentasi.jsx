import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useDeleteDokumentasi = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['dokumentasi.delete'],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`${endpoints.dokumentasi.hapus}/${id}`);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
