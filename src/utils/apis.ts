import { extend } from "umi-request";

const request = extend({
    prefix: 'http://127.0.0.1:7777/'
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

export const findStockByStatus = (status: number, page: number) => {
    return request("drug/findAll", {
        method: "POST",
        data: {
            status: status,
            page: page,
            pageSize: 10
        }
    })
}

export const insertStock = (body: any) => {
    return request("drug/insertStock", {
        method: "POST",
        data: body
    })
}

export const updateStock = (body: any) => {
    return request("drug/updateStock", {
        method: "POST",
        data: body
    })
}

export const deleteStock = (body: any) => {
    return request("drug/deleteStock", {
        method: "POST",
        data: body
    })
}
