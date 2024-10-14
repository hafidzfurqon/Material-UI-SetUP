import axios from 'axios';

// ----------------------------------------------------------------------
const HOST_API = 'http://127.0.0.1:8000/';
const axiosInstance = axios.create({ baseURL: HOST_API });

// Request interceptor (tidak perlu menambahkan header Authorization karena menggunakan cookie HTTP-only)

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
  users: {
    semua: '/api/user',
    tambah: 'api/user/tambah',
    tampilkan: '/api/user/tampilkan',
    edit: '/api/user/edit',
    import: '/api/user/import',
  },
};
