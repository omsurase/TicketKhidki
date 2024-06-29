const { createClient } = require('redis');

const client = createClient({
    password: 'x1xhhQcgV9Vs56GJeB1Ix3TEdaGPnwMN',
    socket: {
        host: 'redis-14264.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 14264
    }
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

client.on('connect', () => {
    //console.log(client);
    console.log('Connected to Redis');
});

client.connect();

module.exports = client;