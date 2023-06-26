import fs, { open } from 'fs/promises';
import {createWriteStream} from 'fs';
import { getFullPath, logError } from './utils.js';

const printFileContent = async (fileName) => {
    const fullPath = getFullPath(fileName);
    try {
        const fd = await open(fullPath);
        const readableStream = fd.createReadStream({ encoding: 'utf8' });
        readableStream.on('data', (data) => {
            process.stdout.write(`${data}\n`);
        });
    } catch (e) {
        logError(e);
    }

}


const createFile = async (fileName) => {
    try {
        const fullPath = getFullPath(fileName)
        await fs.writeFile(fullPath, '', { flag: 'wx' });
    } catch (e) {
        logError(e);
    }
}

const removeFile = async (fileName) => {
    try {
        const fullPath = getFullPath(fileName);
        await fs.unlink(fullPath);
    } catch (e) {
        logError(e);
    }
}

const renameFile = async (oldPath, newPath) => {
    try {
        await fs.rename(oldPath, newPath);
    } catch (e) {
        logError(e)
    }
}

const copyFile = async (pathToFile,  pathToNewDirectory) => {
    try {
        const fd = await open(pathToFile);
        const readableStream = fd.createReadStream({ encoding: 'utf8' });
        const writable = createWriteStream(pathToNewDirectory);
        readableStream.pipe(writable);
    } catch (e) {
        logError(e);
    }
}

const moveFile = async (pathToFile,  pathToNewDirectory) => {
    try {
        await copyFile(pathToFile, pathToNewDirectory);
        await removeFile(pathToFile);
    } catch (e) {
        logError(e)
    }
}

export { createFile, printFileContent, removeFile, renameFile, moveFile, copyFile }
