import { useQuery } from '@tanstack/react-query';
import axiosInstance, { endpoints } from 'src/utils/axios';

export const useFetchDokumentasi = () => {
  return useQuery({
    queryKey: ['dokumentasi'],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.dokumentasi.semua);
      console.log(response);
      return response.data.data;
    },
  });
};
