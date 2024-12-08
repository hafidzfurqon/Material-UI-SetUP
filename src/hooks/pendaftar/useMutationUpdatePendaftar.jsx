import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationUpdatePendaftar = ({ onError, onSuccess }, id) => {
  return useMutation({
    mutationKey: ['update.pendaftar'],
    mutationFn: async (body) => {
      const response = await axiosInstance.post(`${endpoints.pendaftar.edit}/${id}`, body);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
