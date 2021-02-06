import {env as local} from './CustomEnvironments/local';
const allEnvs = {
    local,
};

const env = allEnvs[NODE_ENV];
console.log(`Env: ${NODE_ENV}`);
console.log(env);
export default env;
