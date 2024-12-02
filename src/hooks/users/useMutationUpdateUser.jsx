import { useMutation } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useMutationUpdateUser = ({ onError, onSuccess }, id) => {
  return useMutation({
    mutationKey: ['update.user'],
    mutationFn: async (body) => {
      const response = await axiosInstance.post(`${endpoints.users.edit}/${id}`, body);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
