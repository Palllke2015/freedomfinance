import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";
export declare const getMongoConfig: (ConfigService: ConfigService<Record<string, unknown>>) => Promise<TypegooseModuleOptions>;
