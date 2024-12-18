import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useFetchKegiatan = () => {
  return useQuery({
    queryKey: ['fetchKegiatan'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.kegiatan.semua);
      console.log(res.data.data)
      return res.data.data;
    },
    retry: false,
  });
};
