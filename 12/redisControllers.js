let redis = require('redis');

async function redisCreateController(name, content){
    const client = await redis.createClient({
        url: 'redis://127.0.0.1:6379'
    })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

    try{
        await client.set(name, content);
        console.log('redisCreate success')
    }
    catch(e){
        console.log('redisCreate fail')
    }
}

exports.create = redisCreateController;