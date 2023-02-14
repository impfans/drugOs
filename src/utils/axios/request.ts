import { useAxios } from './axios';

export class AxiosRequestBase {
	/**
	 * get请求方法
	 * @param isToken - 是否需要鉴权
	 * @param url - 请求地址
	 * @param headers - 请求头设置
	 * @returns
	 */
	async fetchByGet(session = {}, url: string, headers = {}) {
		try {
			const res = await useAxios(session).get(url, headers);
			if (res.data?.code === 401) {
				return '';
			}
			return res.data;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * post请求方法
	 * @param isToken - 是否需要鉴权
	 * @param url  - 请求地址
	 * @param params - 请求参数
	 * @param headers - 请求头设置
	 * @returns
	 */
	async fetchByPost(session = {}, url: string, params = {}, headers = {}) {
		try {
			const res = await useAxios(session).post(url, params, { headers });
			if (res.data?.code === 401) {
				return '';
			}
			return res.data;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
