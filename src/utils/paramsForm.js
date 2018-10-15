
export function paramsForm(params) {
    const formData = new FormData();
    for (let k in params) {
        formData.append(k, params[k]);
    }
    return formData;
}