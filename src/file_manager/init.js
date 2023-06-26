import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { spawn } from 'child_process';
import { logError } from './files/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async () => {
    const path = `${__dirname}/files/main.js`;
    const childProcess = spawn('node', [path, ...process.argv]);

    process.stdin.on('data', (value) => {
        childProcess.stdin.write(value);
    });

    childProcess.stdout.on('data', (value) => {
        console.log(value.toString());
    });


    childProcess.on('exit', (value) => {
        process.exit(0);
    })

    childProcess.on('error', (error) => {
        logError(error);
    })
};

await spawnChildProcess();
