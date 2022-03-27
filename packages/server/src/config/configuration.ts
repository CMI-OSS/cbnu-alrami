import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';


export default (option) => {
  const YAML_CONFIG_FILENAME = `../../${option}.yaml`;
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};