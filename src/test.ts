function fetchWithRetry(url, options) {
  request = function (url, options) {
    return new Promise((resolve, reject) => {
      const { headers, data, method } = options;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, options.headers.key);
        });
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (options.method === 'GET') {
        console.log('get');
        xhr.send();
      } else {
        console.log('no get');
        xhr.send(data);
      }
    });
  };
}
