import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationMentoring = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['tambah.mentoring'],
    mutationFn: async (body) => {
      const response = await axiosInstance.post(endpoints.mentoring.tambah, body);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
