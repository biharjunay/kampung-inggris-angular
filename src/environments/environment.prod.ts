import { Environment } from "../interfaces/env.interface";

export default {
  appUrl: 'http://localhost:8000/api',
  storageUrl: 'http://localhost:8000/storage',
  version: '1.0',
  production: false
} satisfies Environment
