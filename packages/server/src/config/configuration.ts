import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';


export default () => {
  const YAML_CONFIG_FILENAME = `../../${process.env.NODE_ENV ? process.env.NODE_ENV : 'prod'}.yaml`;
  const configure = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
  return {...configure, ...process.env};
};