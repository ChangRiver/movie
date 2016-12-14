module.exports = {
  port: 3000,
  session: {
    secret: 'movie',
    key: 'movie',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/imooc'
};
