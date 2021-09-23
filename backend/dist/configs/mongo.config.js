"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConfig = void 0;
const getMongoConfig = async (ConfigService) => {
    return Object.assign({ uri: getMongoString(ConfigService) }, getMongoOptions());
};
exports.getMongoConfig = getMongoConfig;
const getMongoString = (ConfigService) => 'mongodb://' +
    ConfigService.get('MONGO_LOGIN') +
    ':' +
    ConfigService.get('MONGO_PASSWORD') +
    '@' +
    ConfigService.get('MONGO_HOST') +
    ':' +
    ConfigService.get('MONGO_PORT') +
    '/' +
    ConfigService.get('MONGO_AUTH_DATABASE');
const getMongoOptions = () => ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
//# sourceMappingURL=mongo.config.js.map