export const host = "http://127.0.0.1:8080"

export function post(endpoint, body, actions) {
    if (actions.beginAction)
        actions.beginAction()
    if (actions.showSpinner)
        actions.showSpinner();
    return fetch(host + endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.status === 200) return response.json();
        response.json().then(error => actions.errorAction(error.message))
        if (actions.showSpinner)
            actions.showSpinner();
        return [];
    })
}

export function get(endpoint, params, actions) {
    let urlParams = "?"
    Object.keys(params).forEach(key => urlParams += key + "=" + params[key] + "&")
    urlParams = urlParams.substring(0, urlParams.length - 1)
    if (actions.beginAction)
        actions.beginAction()
    if (actions.showSpinner)
        actions.showSpinner();
    return fetch(host + endpoint + urlParams, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) return response.json();
        response.json().then(error => actions.errorAction(error.message))
        if (actions.showSpinner)
            actions.showSpinner();
        return [];
    })
}