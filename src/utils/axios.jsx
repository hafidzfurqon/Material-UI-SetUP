import axios from 'axios';

// ----------------------------------------------------------------------
const HOST_API = import.meta.env.VITE_HOST_API;
const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/user/tampilkan',
    login: '/api/login',
    logout: '/api/logout',
    register: '/api/daftar',
  },
  kegiatan: {
    semua: '/api/kegiatan',
    tambah: 'api/kegiatan/tambah',
    tampilkan: '/api/kegiatan/tampilkan',
    edit: '/api/kegiatan/edit',
  },
  dokumentasi: {
    semua: '/api/dokumentasi',
    tambah: 'api/dokumentasi/tambah',
    tampilkan: '/api/dokumentasi/tampilkan',
    edit: '/api/dokumentasi/edit',
  },
  mentoring: {
    semua: '/api/mentoring',
    tambah: 'api/mentoring/tambah',
    tampilkan: '/api/mentoring/tampilkan',
    edit: '/api/mentoring/edit',
    hapus: '/api/mentoring/hapus',
  },
  users: {
    semua: '/api/user',
    tambah: 'api/user/tambah',
    tampilkan: '/api/user/tampilkan',
    edit: '/api/user/edit',
    import: '/api/user/import',
  },
};
