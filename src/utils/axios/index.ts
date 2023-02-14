export * from './request';
export * from './apis';
export const ApiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:7777':'http://localhost:7777';
