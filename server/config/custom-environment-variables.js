module.exports = {
  host: 'HOST',
  port: 'PORT',
  cors: {
    origin_proto: 'CORS_ORIGIN_PROTO',
    origin_mask: 'CORS_ORIGIN_MASK',
  },
  db: {
    username: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_NAME',
    host: 'DB_HOST',
    port: 'DB_PORT',
  },
  session: {
    schema: {
      tableName: 'SESSION_SCHEMA_TABLE_NAME',
    },
    secret: 'SESSION_SECRET',
    cookieOptions: {
      maxAge: 'SESSION_COOKIE_OPTIONS_MAX_AGE',
      sameSite: 'SESSION_COOKIE_OPTIONS_SAME_SITE',
      secure: 'SESSION_COOKIE_OPTIONS_SECURE',
    },
  },
};
