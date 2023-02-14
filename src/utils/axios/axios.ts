// @ts-ignore
import axios from 'axios';

export function useAxios(session: any) {
	const instance = axios.create();
	instance.defaults.withCredentials = false;
	instance.defaults.timeout = 5000;
	instance.interceptors.request.use(async (request) => {
		(request as any).headers.common = {
			Authorization: `Bearer ${(session as any).user.access_token}`,
		};
		return request;
	});
	return instance;
}
