const path = require('path');
const yargs = require('yargs');
const gulp = require('gulp');
const gulpTemplate = require('gulp-template');
const gulpRename = require('gulp-rename');
const _ = require('lodash');
const inquirer = require('inquirer');

const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
};

gulp.task('component', (done) => {
    let type = yargs.argv.type,
        name = yargs.argv.name,
        destPath = yargs.argv.dest;

    // map of all paths
    let paths = {
        es2015: {
            template: path.join(__dirname, 'generator', 'component/**/*.**'),
            dest: 'app/common'
        },
        es5: {
            template: path.join(__dirname, 'generator', 'component5/**/*.**'),
            dest: 'angular/components'
        }
    };

    inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: 'Select component type',
        choices: ['es2015', 'es5'],
        when: !yargs.argv.type
    }, {
        type: 'input',
        name: 'name',
        message: 'Name your component (Use camelCase)',
        validate: (name) => name ? true : 'Provide component name',
        when: !yargs.argv.name
    }, {
        type: 'input',
        name: 'destPath',
        message: (answers) => `Provide destination path. Default is '${paths[type || answers.type].dest}'`,
        default: (answers) => paths[type || answers.type].dest,
        when: !yargs.argv.dest
    }]).then((answers) => {
        type = answers.type || type;
        name = answers.name || name;
        destPath = answers.destPath || destPath;

        gulp.src(paths[type].template)
            .pipe(gulpTemplate({
                name: name,
                upCaseName: cap(name),
                kebabCaseName: _.kebabCase(name),
                componentPath: path.join('markup', destPath, name).split(path.sep).join('/')
            }))
            .pipe(gulpRename((path) => {
                path.basename = path.basename.replace('temp', name);
            }))
            .pipe(gulp.dest(path.join(__dirname, destPath, name)))
            .on('end', done);
    });
});

gulp.task('modal', (done) => {
    let name = yargs.argv.name,
        destPath = yargs.argv.dest;

    // map of all paths
    let paths = {
        template: path.join(__dirname, 'generator', 'modal/**/*.**'),
        dest: 'app/common/modals'
    };

    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Name your modal (Use camelCase)',
        validate: (name) => name ? true : 'Provide modal name',
        when: !yargs.argv.name
    }, {
        type: 'input',
        name: 'destPath',
        message: (answers) => `Provide destination path. Default is '${paths.dest}'`,
        default: (answers) => paths.dest,
        when: !yargs.argv.dest
    }]).then((answers) => {
        name = answers.name || name;
        destPath = answers.destPath || destPath;

        gulp.src(paths.template)
            .pipe(gulpTemplate({
                name: name,
                upCaseName: cap(name),
                kebabCaseName: _.kebabCase(name),
                componentPath: path.join('markup', destPath, name).split(path.sep).join('/')
            }))
            .pipe(gulpRename((path) => {
                path.basename = path.basename.replace('temp', name);
            }))
            .pipe(gulp.dest(path.join(__dirname, destPath, name)))
            .on('end', done);
    });
});
