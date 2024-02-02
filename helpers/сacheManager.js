const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});


const addToCache = (key, value) => {
  if (client.connected) {
    client.set(`${key}`, value, 'EX', 3600);
  } else {
    // Обработка случая, когда клиент закрыт
    console.error('Redis client is closed. Unable to add to cache.');
  }
};

const getFromCache = async (key) => {
  if (!client.connected) {
    throw new Error('Redis client is not connected');
  }

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