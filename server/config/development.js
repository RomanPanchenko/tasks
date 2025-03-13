const ENV = process.env.NODE_ENV;

module.exports = {
  env: ENV,
  tz: 'UTC',
  host: 'localhost',
  port: 3000,
  db: {
    username: 'root',
    password: '',
    database: 'tasks',
    host: 'localhost',
    port: 3306,
    synchronize: false,
  },
  session: {
    cookieOptions: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
      secure: false,
      httpOnly: true,
    },
  },
  logger: {
    error_log_file: true,
    combined_log_file: true,
  },
};
