import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const decompress = async (sousePath, destPath) => {
    const brotliDecompress = createBrotliDecompress();
    const readStream = createReadStream(sousePath);
    const destination = createWriteStream(destPath);

    await pipeline(readStream, brotliDecompress, destination);
};

const compress = async (sousePath, destPath) => {
    const brotliCompress = createBrotliCompress();
    const sourceStream = createReadStream(sousePath);
    const destinationStream = createWriteStream(destPath);

    await pipeline(sourceStream, brotliCompress, destinationStream);
};


export {decompress, compress}
