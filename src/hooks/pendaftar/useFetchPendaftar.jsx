import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useFetchPendaftar = () => {
  return useQuery({
    queryKey: ['fetch.pendaftar'],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.pendaftar.semua);
      console.log(response);
      return response.data.data;
    },
  });
};
