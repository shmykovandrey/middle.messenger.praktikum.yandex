enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
};

function request<TResponse>(
  url: string,
  options: Options = { method: METHOD.GET }
): Promise<TResponse> {
  const { method, data } = options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      resolve(xhr);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    if (method === METHOD.GET || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
}

export default request;
