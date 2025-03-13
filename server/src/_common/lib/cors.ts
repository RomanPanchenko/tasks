import * as config from 'config';
import { HttpException, HttpStatus } from '@nestjs/common';

const corsOriginProto = (config.get('cors.origin_proto') || '').toLowerCase();
const corsOriginMask = (config.get('cors.origin_mask') || '').toLowerCase();

const corsOpts = Object.assign({}, config.get('cors'));
delete corsOpts.origin_proto;
delete corsOpts.origin_mask;

const ASTERISK = '*';

if (typeof corsOriginProto !== 'string' || (corsOriginProto !== 'http' && corsOriginProto !== 'https' && corsOriginProto !== ASTERISK)) {
  throw new Error(`cors.origin_proto must be ether "http", "https" or "*", but it is "${corsOriginProto}"`);
}

const originMaskDomainParts = (corsOriginMask || '').split('.');

if (typeof corsOriginMask !== 'string' ||
  (originMaskDomainParts.length === 1 && originMaskDomainParts[0] !== ASTERISK) ||
  (originMaskDomainParts.length === 2 && originMaskDomainParts.includes(ASTERISK))
) {
  throw new Error(`cors.origin_mask must be ether "*" or at least two level domain name, but it is "${corsOriginMask}"`);
}

const isProtoValid = (origin = '') => {
  if (corsOriginProto === ASTERISK) {
    if (!origin) return true;
    return (origin.startsWith('http://') || origin.startsWith('https://'));
  } else {
    return origin.startsWith(`${corsOriginProto}://`);
  }
};

const getOriginHost = (origin = '') => {
  const a = origin.split('://');
  if (a.length > 1) {
    return a[1]; // host
  }

  return '';
};

const isDomainValid = (origin) => {
  const originDomainParts = origin.split('.');
  if (originDomainParts.length < 1 || !originMaskDomainParts.length) {
    return false;
  }

  if (!originMaskDomainParts.includes(ASTERISK) && originDomainParts.length !== originMaskDomainParts.length) {
    return false;
  }

  let originPtr = originDomainParts.length - 1;
  for (let originMaskPtr = originMaskDomainParts.length - 1; originMaskPtr >= 0; originMaskPtr--) {
    if (originPtr < 0) {
      break;
    }

    if (originMaskDomainParts[originMaskPtr] === ASTERISK) {
      originPtr--;
      continue;
    }

    if (originDomainParts[originPtr] !== originMaskDomainParts[originMaskPtr]) {
      return false;
    }

    originPtr--;
  }

  return true;
};

export const isCorsOriginValid = (origin) => {
  return isProtoValid(origin) && isDomainValid(getOriginHost(origin));
};

export const corsOptions = Object.assign({
  origin: function(origin, callback) {
    if (!origin || isCorsOriginValid(origin)) {
      callback(null, true);
    } else {
      const error = new HttpException(`Not allowed by CORS. Origin="${origin}"`, HttpStatus.FORBIDDEN);
      delete error.stack;
      callback(error);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
}, corsOpts);

// // Valid
// console.log('example.com', '*', isCorsOriginValid('example.com', '*'));
//
// console.log('example.com', '*.example.com', isCorsOriginValid('example.com', '*.example.com'));
// console.log('sub1.example.com', '*.example.com', isCorsOriginValid('sub1.example.com', '*.example.com'));
// console.log('sub1.domain.example.com', '*.example.com', isCorsOriginValid('sub1.domain.example.com', '*.example.com'));
// console.log('sub1.domain.example.com', 'sub1.*.example.com', isCorsOriginValid('sub1.domain.example.com', 'sub1.*.example.com'));
//
// console.log('example.com', 'example.com', isCorsOriginValid('example.com', 'example.com'));
//
// // Invalid
// console.log('domain.example.com', 'example.com', isCorsOriginValid('domain.example.com', 'example.com'));
// console.log('domain-example.com', 'example.com', isCorsOriginValid('domain-example.com', 'example.com'));
//
// // Invalid
// console.log('sub1.domain.example.com', 'domain.example.com', isCorsOriginValid('sub1.domain.example.com', 'domain.example.com'));
// console.log('sub1.domain.example.com', 'marius.*.example.com', isCorsOriginValid('sub1.domain.example.com', 'marius.*.example.com'));
