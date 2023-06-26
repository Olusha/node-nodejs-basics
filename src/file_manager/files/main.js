import { handleOcOperations } from './oc_operations.js';
import { copyFile, createFile, moveFile, printFileContent, removeFile, renameFile } from './files_operations.js';
import {changeDirectory, goUp, printLsInfo} from './directory.js';
import {userInfo} from 'os';
import { decompress, compress } from './zip.js';
import { calculateHash } from './hash.js';
import { logError, getArgsMap } from './utils.js';

const args = getArgsMap();
const userName = args.get('username');
process.stdout.write(`Welcome to the File Manager, ${userName || userInfo().username}!`);
changeDirectory();


const echoInput = (chunk) => {
    const values = chunk.toString().split(' ');
    const operation = values[0].trim();
    const firstParam = values[1]?.trim();
    const secondParam = values[2]?.trim();
    try {
        switch (operation) {
        case '.exit':
            process.exit(0);
            break;
        case 'ls':
            printLsInfo();
            break;
        case 'cd':
            changeDirectory(firstParam);
            break;
        case 'up':
            goUp();
            break;
        case 'cat':
            printFileContent(firstParam);
            break;
        case 'add':
            createFile(firstParam);
            break;
        case 'rn':
            renameFile(firstParam, secondParam);
            break;
        case 'cp':
            copyFile(firstParam, secondParam);
            break;
        case 'move':
            moveFile(firstParam, secondParam);
            break;
        case 'rm':
            removeFile(firstParam);
            break;
        case 'oc':
            handleOcOperations(firstParam);
            break;

        case 'compress':
            compress(firstParam, secondParam);
            break;

        case 'decompress':
            decompress(firstParam, secondParam);
            break;

        case 'hash':
            calculateHash(firstParam);
            break;
        default:
            console.log('Operation is not defined')
        }
    } catch (e) {
        logError(e);
    }
};

process.stdin.on('data', echoInput);

