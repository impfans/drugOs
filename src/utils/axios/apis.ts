import { AxiosRequestBase } from "./request";
import { ApiUrl } from "./index";
class apiModels extends AxiosRequestBase {
	/**
	 * 拼接请求地址
	 * @param api - 拼接好的query值
	 * @returns
	 */
	commonParse(api: string) {
		return `${ApiUrl}/${api}`;
	}
	// ------------标签-----------------
	/**
	 * 获取标签分类
	 * @param params
	 * @returns
	 */
	GetCategory(params?: { name?: string; offset?: number; limit?: number }) {
		const url = this.commonParse(
			`category/getCategory?name=${params?.name || ""}&offset=${params?.offset || ""
			}&limit=${params?.limit || ""}`
		);
		return this.fetchByGet({}, url);
	}
}
export const models = new apiModels();
