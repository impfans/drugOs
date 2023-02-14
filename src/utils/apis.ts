import { extend } from "umi-request";

const request = extend({
    prefix: 'http://localhost:7777/'
});

export const insertEmployee = (body: any) => {
    return request("employee/insertEmployee", {
        method: "POST",
        data: body
    })
}

export const updateEmployee = (body: any) => {
    return request("employee/updateEmployee", {
        method: "POST",
        data: body
    })
}

export const deleteEmployee = (body: any) => {
    return request("employee/deleteEmployee", {
        method: "POST",
        data: body
    })
}

export const findEmployeeByStatus = (status: number, page: number) => {
    return request("/employee/findAll", {
        method: "POST",
        data: {
            status: status,
            page: page,
            pageSize: 10
        }
    })
}