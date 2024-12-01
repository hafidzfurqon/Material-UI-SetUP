import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationPendaftaran = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['mendaftar'],
    mutationFn: async (body) => {
      const response = await axiosInstance.post(endpoints.auth.register, body);
      return response;
    },
    onSuccess,
    onError,
  });
};
