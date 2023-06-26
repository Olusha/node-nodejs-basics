import { arch, cpus, EOL, homedir, userInfo } from 'os';
import { logError } from './utils.js';

const handleOcOperations = (param) => {
    try {
        switch (param) {
        case '--EOL':
            console.log(EOL);
            break;
        case '--cpus':
            const cp = cpus();
            console.table(cp);
            break;
        case '--homedir':
            console.log(homedir());
            break;
        case '--username':
            console.log(userInfo().username);
            break;
        case '--architecture':
            console.log(arch());
            break;
        default:
            console.log('Invalid input');
        }
    } catch (e) {
        logError(e);
    }
}

export { handleOcOperations }
