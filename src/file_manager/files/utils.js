import { join } from 'path';
import { userInfo } from 'os';

const getFullPath = (fileName) => {
    return join(process.cwd(), fileName);
}

const logError = (error) => {
    console.log('Operation failed', error);
}

const getUserName = () => {
    const args = getArgsMap();
    return args.get('username') || userInfo().username;
}

const getArgsMap = () => {
    const props = process.argv.filter(arg => arg.startsWith('--'));

    const argsMap = new Map();
    props.forEach(prop => {
        const sp = prop.split('=');
        const key = sp[0].slice(2)
        const value = sp[1];
        argsMap.set(key, value);
    });

    return argsMap;
};

export {getFullPath, logError, getArgsMap, getUserName}
