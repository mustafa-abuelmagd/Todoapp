import {development} from './config.dev' ;
import {configType} from "./config.dev";

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const configuration: configType = development;
configuration.NODE_ENV = NODE_ENV;
export const config = configuration;
