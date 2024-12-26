const { createClient } = require("redis");

const client = createClient({
  username: "default",
  password: "xunTch7Pv2RTzg8UHCTiitHWaqjI0LGW",
  socket: {
    host: "redis-15211.c15.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 15211,
  },
});

client.on("error", (err) => {
  console.log("Redis Client Error: ", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

// Use async IIFE to handle the async connection
(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();

module.exports = client;
