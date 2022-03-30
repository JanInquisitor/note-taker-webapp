const path = require('path');
const fs = require('fs');
const util = require('util');

const baseDir = path.join(__dirname, '../')

let controllers = {}

controllers.writeToFile = function (dir, fileName, data) {
    // If the README file doesn't this makes a new one.
    if (fs.existsSync(baseDir + dir + "/" + fileName) === false) {
        fs.open(
            baseDir + dir + "/" + fileName,
            'wx',
            function (err, fileDescriptor) {
                if (!err && fileDescriptor) {
                    // let stringData = JSON.stringify(data);

                    // write to file and close it.
                    fs.writeFile(fileDescriptor, data, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function () {
                                if (!err) {
                                    console.log('File created successfully!')
                                    return false;
                                } else {
                                    console.log("Error closing new file");
                                    return false;
                                }
                            })
                        } else {
                            console.log("Error Writing to new file");
                            return false;
                        }
                    })
                } else {
                    console.log("Could not create new file, it may already exist");
                }
            });
    }

    // Updates the README file.
    if (fs.existsSync(baseDir + dir + "/" + fileName) === true) {
        fs.open(
            baseDir + dir + "/" + fileName,
            "r+",
            (err, fileDescriptor) => {

                if (!err && fileDescriptor) {
                    fs.ftruncate(fileDescriptor, (err) => {
                        if (!err) {

                            fs.writeFile(fileDescriptor, data, (err) => {
                                if (!err) {

                                    fs.close(fileDescriptor, () => {
                                        if (!err) {
                                            console.log('File updated successfully.')
                                        } else {
                                            console.error('There was an error closing the file.')
                                        }
                                    })
                                } else {
                                    console.error("Error writing to file.")
                                }

                            })
                        } else {
                            console.error('There was an error truncating the file.')
                            console.error(err)

                        }
                    })

                } else {
                    console.log("Error opening the file.")
                }
            });
    }
}

controllers.readJSON = function (dir, file) {
    return JSON.parse(fs.readFileSync(baseDir + dir + "/" + file + ".json", "utf8"))

};

controllers.read = function (dir, file) {
    return fs.readFileSync(baseDir + dir + "/" + file + ".json", 'utf8')
}

module.exports = controllers;
