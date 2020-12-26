import moduleAlias from 'module-alias'; // has to stay first and on top
import path from 'path';

const aliasDir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
console.log(aliasDir);
moduleAlias.addAlias('@shared', path.resolve(__dirname, `../../shared/${aliasDir}`));
moduleAlias();
