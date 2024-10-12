import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.users.semua);
      console.log(response);
      return response.data.data;
    },
  });
};
