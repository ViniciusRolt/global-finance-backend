"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const API_BASE_URL = 'http://localhost:3000';
const api = axios_1.default.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});
// Interceptor para adicionar token JWT em toda requisição
api.interceptors.request.use(async (config) => {
    const token = await async_storage_1.default.getItem('token');
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Interceptor para tratar erros
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        async_storage_1.default.removeItem('token');
        async_storage_1.default.removeItem('usuario');
    }
    return Promise.reject(error);
});
exports.default = api;
//# sourceMappingURL=api.js.map