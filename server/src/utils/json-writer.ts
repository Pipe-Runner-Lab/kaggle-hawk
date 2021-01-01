import { exception } from 'console';
import { writeFile } from 'fs/promises';
import * as Path from 'path';

export const writeToJSON = async (filename, data): Promise<void> => {
  try {
    console.log(__dirname);
    const filePath = Path.join(__dirname, `${filename}.json`);
    await writeFile(filePath, JSON.stringify(data), {
      encoding: 'utf-8',
      flag: 'w',
    });
  } catch (error) {
    throw new Error(error);
  }
};
