var path = require("path");

var settings = {
  // base config
  path: path.normalize(path.join(__dirname, "..")),
  port: process.env.NODE_PORT || 8000,
  database:
    process.env.DATABASE || "mysql://root:@192.168.1.109:3306/afcash_db",
  theme: process.env.THEME || "default",
  server_url: "http://192.168.1.109",
  host_address: "192.168.1.109"

  /*
    // application config
    postNum: process.env.POST_NUM || '10',
    auth_cookie_name: process.env.AUTH_COOKIE_NAME || 'nd_secret',
    session_secret: process.env.SESSION_SECRET || 'a743894a0e',
    cookie_secret: process.env.COOKIE_SECRET || 'a743894a0e',
    name: process.env.NAME || 'TCG New',
    version: process.env.VERSION || '1.0.0',
    site_url: process.env.SITE_URL || 'http://localhost:3000',
    keywords: process.env.KEYWORDS || '',
    description: process.env.DESCRIPTION || ''
    */
};

module.exports = settings;
