import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react'


const CWD = process.cwd();

const dealProxy = (data: object) => {
  const proxyData = {};
  Object.keys(data).forEach((key: string) => {
    proxyData[`/${key}`] = {
      target: data[key],
      changeOrigin: true,
    };
  });
  return proxyData;
};
// https://vitejs.dev/config/
export default (params) => {
  const { mode } = params;
  const { VITE_BASE_URL, VITE_HTTP_URL } = loadEnv(mode, CWD);
  return {
    plugins: [react()],

    server: {
      host: '0.0.0.0',
      port: 2211,
      proxy: dealProxy({ api: VITE_HTTP_URL }),
    },
  }

}
