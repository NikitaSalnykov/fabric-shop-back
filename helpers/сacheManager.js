const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});


const addToCache = (key, value) => {
  client.set(`${key}`, value, 'EX', 3600); // Устанавливаем время жизни кеша в секундах (в данном случае 1 час)
};

const getFromCache = async (key) => {
  return new Promise((resolve, reject) => {
    client.get(`${key}`, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

module.exports = {
  addToCache,
  getFromCache,
};