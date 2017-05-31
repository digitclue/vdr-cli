const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const {
    kebabCase,
    camelCase
} = require('lodash');

const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
};

class Blueprint {
    constructor(blueprint, name) {
        this._bpPath = path.resolve(__dirname, './templates', blueprint);
        this.name = name;
    }

    get isValid() {
        return fs.existsSync(this._bpPath) && fs.lstatSync(this._bpPath).isDirectory();
    }

    get locals() {
        return {
            kebabName: kebabCase(this.name),
            camelName: camelCase(this.name),
            classifiedName: cap(camelCase(this.name)),
        }
    }

    install(destPath) {
        const dest = path.resolve(process.cwd(), destPath);
        const bpFilesNames = fs.readdirSync(this._bpPath);

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        return Promise.all(bpFilesNames.map(bpFileName => {
            return this._renderFile(bpFileName)
                .then(content => {
                    const filepath = this._getBlueprintFilePath(dest, bpFileName);

                    return this._installFile(filepath, content);
                });
        }));
    }

    _getBlueprintFilePath(dest, bpFileName) {
        return path.join(dest, bpFileName.replace('temp', this.locals.camelName));
    }

    _renderFile(bpFileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(this._bpPath, bpFileName), 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(ejs.render(data, this.locals));
            });
        })
    }

    _installFile(filepath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, content, (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }
}

module.exports = Blueprint;
