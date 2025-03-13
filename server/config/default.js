const ENV = process.env.NODE_ENV;

module.exports = {
  env: ENV,
  tz: 'UTC',
  host: '0.0.0.0',
  port: 3000,
  https_proto: true,
  api_global_prefix: 'api',
  cors: {
    origin_proto: '*',
    origin_mask: '*',
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
  },
  https: {
    key: '',
    cert: '',
  },
  db: {
    type: 'mysql',
    username: '',
    password: '',
    database: '',
    host: '',
    port: 3306,
    synchronize: false,
    logging: true,
    dateStrings: true,
    timezone: 'Z',
  },
  session: {
    createDatabaseTable: false,
    schema: { // column names inside "schema" must be untouched because they are hardcoded in the package
      tableName: '_user_sessions',
      columnNames: {
        session_id: 'sid',
        expires: 'expires',
        data: 'session',
      },
    },
    secret: '',
    saveUninitialized: true,
    resave: false,
    cookieOptions: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  logger: {
    colorize: false, // Colorize output for console

    error_log_file: true, // Write logs to error file
    combined_log_file: true, // Write logs to combine file
    console_log: false, // Write logs to console

    sql_queries: false, // Display SQL queries at all
    force_display_buffered_logs: false, // Display buffered logs even if no error happened
    logger_cache_service_ttl_seconds: 10, // Logger cache expiration time (seconds)
  },
  dateFormat: 'YYYY-MM-DD',
  datetimeFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
  datetimeFormatShort: 'YYYY-MM-DD HH:mm:ss',
};
