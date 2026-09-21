module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'http://74.50.87.101:1338',
  app: {
    keys: env.array('APP_KEYS'),
  },
  proxy: { koa: true },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
