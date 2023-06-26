import { homedir } from 'os';
import fs from 'fs/promises';
import { join } from 'path';
import { logError } from './utils.js';

const logPosition = () => {
    console.log(`You are currently in ${process.cwd()}`)
}

const changeDirectory = (path) => {
    if(!path) {
        changeDirectory(homedir());
        return;
    }

    try {
        process.chdir(path);
        logPosition();
    } catch (err) {
        logError(err);
    }

}

const printLsInfo = async () => {
    try {
        console.log(process.cwd())
        const entries = await fs.readdir(process.cwd(), { withFileTypes: true });
        const dirs = [];
        const files = [];
        for (const entry of entries) {
            if(entry.isDirectory()) {
                dirs.push({ Name: entry.name, Type: 'directory'});
            } else {
                files.push({ Name: entry.name, Type: 'file'});
            }
        }

        dirs.sort(sortByName);
        files.sort(sortByName);

        console.table([...dirs, ...files]);
    } catch (e) {
        logError(e);
    }
}

const sortByName = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

const goUp = () => {
    const currentDir = process.cwd();

    if (currentDir === homedir()) {
        logPosition();
        return;
    }

    const newDir = join(currentDir, '../');
    changeDirectory(newDir);
}

export {goUp, printLsInfo, changeDirectory}
