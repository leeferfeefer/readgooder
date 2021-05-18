
const parse = (fileName) => {
    let subDirectory;
    if (fileName.substring(0,2) === 'gg') {
        subDirectory = 'gg';
    } else if (fileName.substring(0,3) === 'bix') {
        subDirectory = 'bix';
    } else if (!!parseInt(fileName.substring(0,1))) {
        subDirectory = 'number';
    } else {
        subDirectory = fileName.substring(0,1);
    }
    return `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subDirectory}/${fileName}.mp3`;
}

export default {
    parse
}