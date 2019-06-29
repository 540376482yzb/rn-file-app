
export function callApi(endpoint, method, data, query) {

  //check body
  let body = undefined;
  const requireBody = method => {
    const validMethod = ["PATCH", "PUT", "POST"];
    return validMethod.includes(method);
  };

  if (data && requireBody(method)) {
    body = JSON.stringify(data);
  }

  let url = `${API_BASE_URL}/api/v0/${endpoint}?`;
  if (query) {
    Object.keys(query).forEach(key => {
      url += `${key}=${query[key]}&`;
    });
    url = url.slice(0, -1);
  }

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  })
    .then(_normalizeResponseErrors)
    .catch(err => {
      console.log(err);
      throw err;
    });
}

async function _normalizeResponseErrors(res) {
  //handle error with returning error code
  if (!res.ok) {
    //handle error message come back as json
    if (res.headers.has("content-type") && res.headers.get("content-type").startsWith("application/json")) {
      return res.json().then(err => {
        Promise.reject({
          code: res.status,
          message: err.message || err
        })
      });
    }
    return Promise.reject({
      code: res.status,
      message: res.statusText
    });
  }

  const json = await res.json();

  // handle error without error code
  if (!json.status) {
    return Promise.reject({
      message: json.message
    });
  }

  return json;
}