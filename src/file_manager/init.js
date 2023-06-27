import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { spawn } from 'child_process';
import { getUserName, logError } from './files/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async () => {
    const path = `${__dirname}/files/main.js`;
    const userName = getUserName();
    const childProcess = spawn('node', [path]);

    console.log(`Welcome to the File Manager, ${userName}!`);

    process.stdin.on('data', (value) => {
        childProcess.stdin.write(value);
    });

    process.on('exit', (code) => {
        console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    });

    process.on('SIGINT', function () {
        process.exit(2);
    });

    childProcess.on('exit', (value) => {
        if(value === 0) {
            process.exit(0);
        }
    })

    childProcess.stdout.on('data', (value) => {
        console.log(value.toString());
    });

    childProcess.on('error', (error) => {
        logError(error);
    })
};

await spawnChildProcess();
