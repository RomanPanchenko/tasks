import * as config from 'config';

const IS_PRODUCTION = config.get('env') === 'production';
const IS_TEST = config.get('env') === 'test';
const HOST = config.get('host');
const PORT = config.get('port');

const apiGlobalPrefix = (config.get('api_global_prefix') || '').replace(/[/\s]*/g, '');
const API_GLOBAL_PREFIX = apiGlobalPrefix ? '/' + apiGlobalPrefix : '';

const IS_HTTPS_PROTO = !!config.get('https_proto');

const getBaseUrl = (): string => {
  const SHOULD_ADD_PORT = (IS_HTTPS_PROTO && PORT !== '443') || (!IS_HTTPS_PROTO && PORT !== 80);

  let baseUrl = (IS_HTTPS_PROTO ? 'https://' : 'http://') + HOST;
  if (SHOULD_ADD_PORT) baseUrl = `${baseUrl}:${PORT}`;

  return baseUrl;
};

const APP_BASE_URL = getBaseUrl();

export {
  IS_PRODUCTION,
  IS_TEST,
  API_GLOBAL_PREFIX,
  HOST,
  PORT,
  APP_BASE_URL,
};
