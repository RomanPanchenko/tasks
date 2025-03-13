const ENV = process.env.NODE_ENV;

module.exports = {
  env: ENV,
  tz: 'UTC',
  host: 'localhost',
  port: 3000,
  images_base_url: '',
  db: {
    username: 'root',
    password: '',
    database: 'test_tasks',
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
    colorize: true,

    error_log_file: false,
    combined_log_file: false,
    console_log: false,

    sql_queries: false,
    force_display_buffered_logs: false,
    logger_cache_service_ttl_seconds: 600,
  },
};
