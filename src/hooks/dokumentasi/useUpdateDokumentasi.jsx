import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useUpdateDokumentasi = ({ onError, onSuccess }, id) => {
  return useMutation({
    mutationKey: ['edit.dokumentasi'],
    mutationFn: async (body) => {
      const response = await axiosInstance.post(`${endpoints.dokumentasi.edit}/${id}`, body);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
