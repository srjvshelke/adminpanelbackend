let redis = require('redis');
let client = redis.createClient();

client.on('connect',async() => {
    console.log('redis server is connected')  
    // console.log(await client.set('name','akshsy'))
    await client.flushAll();
    // await client.sAdd('d1',['a','b']);    
    // await client.sAdd('d2',['c','d']);
    // await client.sMove('d1','d2','a','b')
    // console.log(await client.sMembers('d1')
    // console.log(await client.sMembers('d2'))
    // console.log(await client.sUnion(['d1','d2']))   
});
client.connect();
module.exports=client;

