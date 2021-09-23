import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (ConfigService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(ConfigService ),
        ...getMongoOptions(),
    };
}

const getMongoString = (ConfigService: ConfigService) => 
    'mongodb://' + 
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
})