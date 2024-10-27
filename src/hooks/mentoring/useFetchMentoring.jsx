import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useFetchMentoring = () => {
  return useQuery({
    queryKey: ['mentoring'],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.mentoring.semua);
      const result = response.data.data.data;
      return result;
    },
  });
};
