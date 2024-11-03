import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationDokumentasi = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['addDokumentasi'],
    mutationFn: async (body) => {
      const response = await axiosInstance.post(endpoints.dokumentasi.tambah, body);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
