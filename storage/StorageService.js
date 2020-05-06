const dynamboDbService = require('./dynmoDbService');
const redisService = require('../services/redisService');
const logger = require('../utli/logger')

exports.DynmodbAddItem = (data) => {
    logger.info('Adding item to the dynmodb');
    return dynamboDbService.addItem(data);
}

exports.DynmodbGetItemById = async (id) => {
    logger.info('Getting item from dynamodb');
    let item = await redisService.getData(id);
    if (item) {
        logger.info('Item available in redis');
        return JSON.parse(item);
    } else {
        let item = await dynamboDbService.getItemById(id);
        await redisService.setData(id, JSON.stringify(item));
        return item;
    }
}