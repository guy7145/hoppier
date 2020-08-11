import {env as local} from './CustomEnvironments/local';
const allEnvs = {
    local,
};
const envName = 'local';
const env = allEnvs[envName];
console.log(`Env: ${envName}`);
console.log(env);
export default env;
