import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationDeleteMentoring = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ['delete.mentoring'],
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`${endpoints.mentoring.hapus}/${id}`);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
