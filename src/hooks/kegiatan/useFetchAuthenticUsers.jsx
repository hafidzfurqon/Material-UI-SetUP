import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useFetchAuthenticUsers = () => {
  return useQuery({
    queryKey: ['usersData'],
    queryFn: async () => {
      const userId = sessionStorage.getItem('user_id');
      const res = await axiosInstance.get(`${endpoints.auth.me}/${userId}`);
      console.log(res.data.data);
      return res.data.data;
    },
    retry: 1,
  });
};
