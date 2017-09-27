const fs = require('fs-extra');
const path = require('path');

let image_info_cached = null;

function readImageInfoFile() {
    if(image_info_cached) return image_info_cached;
    const image_info = path.join(global.root_path, 'image.info.json');
    if(fs.existsSync(image_info)) {
        image_info_cached = JSON.parse(fs.readFileSync(image_info, 'utf8'));
        return image_info_cached;
    } else {
        return null;
    }
}

function forceReadImageInfoFile() {
    image_info_cached = null;
    return readImageInfoFile();
}

function checkImageFilesExist(callback) {
    fs.readdir(global.root_path, (err, files) => {
        if(err) return callback(err);

        let image_found = false;
        let image_info_found = false;
        for(let f of files) {
            if(f === 'image.img' && !image_found) image_found = true;
            if(f === 'image.info.json' && !image_info_found) image_info_found = true;
        }
        if(image_found && image_info_found) return callback();
        return callback('Image files not found!');
    });
}

module.exports = {
    forceReadImageInfoFile: forceReadImageInfoFile,
    readImageInfoFile: readImageInfoFile,
    checkImageFilesExist: checkImageFilesExist
};