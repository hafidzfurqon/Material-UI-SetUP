import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationCreateKegiatan = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['create.kegiatan'],
    mutationFn: async (body) => {
      const response = await axiosInstance.post(endpoints.kegiatan.tambah, body);
      return response;
    },
    onSuccess,
    onError,
  });
};
