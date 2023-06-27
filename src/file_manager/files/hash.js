import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { logError } from './utils.js';

const calculateHash = async (path) => {
    try {
        const contents = await readFile(path, { encoding: 'utf8' });
        const hash = createHash('sha256');
        const result = hash.update(contents).digest('hex');
        console.log(result);
    } catch (e) {
        logError(e);
    }
};

export {calculateHash}
