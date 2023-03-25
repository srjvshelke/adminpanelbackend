const clsRedisCLient = require('./clsRedisClient.model')
const objredis = new clsRedisCLient()

class redisCommon{
    async redisPushFunc(globalArray,strHmi,data){
        try {
            switch(globalArray){
                case 'arrUsers':
                    await objredis.pushInRedis("arrUsers",strHmi,data)
            
                }
            
            
        } catch (error) {
            
        }

}
    
}
module.exports = redisCommon;