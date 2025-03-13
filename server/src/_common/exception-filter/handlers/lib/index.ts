import stringify from 'safe-stable-stringify';

export const getRequestDetails = (request) => {
  if (typeof request?.method !== 'string' || request?.url !== 'string') {
    return '';
  }

  let message = `${request.method}: ${request.url}`;
  if (request.params && typeof request.params === 'object' && Object.keys(request.params).length) {
    message += `\nparams: ${stringify(request.params)}`;
  }

  if (request.query && typeof request.query === 'object' && Object.keys(request.query).length) {
    message += `\nquery: ${stringify(request.query)}`;
  }

  if (request.body && typeof request.body === 'object' && Object.keys(request.body).length) {
    message += `\nbody: ${stringify(request.body)}`;
  }

  return message;
};
