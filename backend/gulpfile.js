const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const run  = require('gulp-run-command').default;
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return gulp
    .src('dist', { allowEmpty: true })
    .pipe(clean());
});

const copiarArquivosJson = () => gulp.series('clean', () => {

  return gulp
    .src(['src/**/*.json', '.env'])
    .pipe(gulp.dest('dist'));

});

gulp.task('scripts', gulp.series(copiarArquivosJson(), () => {

  const tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js
    .pipe(gulp.dest('dist'))
    .on('end', function(){ process.stdout.write('rs'); });

}));


gulp.task('build', gulp.series('scripts'));

gulp.task('watch', gulp.series('build', () => {
  return gulp.watch(['src/**/*.ts', 'src/**/*.json'], gulp.series('build'));
}));

gulp.task('migrateUp', () => {
  return run('node_modules/.bin/sequelize db:migrate');
});

function migrateUp() {
  return run('node_modules/.bin/sequelize db:migrate');
}

function startPm2() {
  return run('pm2 start dist/index.js --name "mobileBackend" ');
}

function stopPm2() {
  return run('pm2 stop mobileBackend', { ignoreErrors: true });
}

gulp.task('start', () => {
  return run('pm2 start dist/index.js');
});

gulp.task('stop', () => {
  return run('pm2 kill');
})

gulp.task('docker', gulp.series(stopPm2(), 'build', migrateUp(), startPm2(), () => {
  return gulp.watch(['src/**/*.ts', 'src/**/*.json'], gulp.series(stopPm2(), 'build', migrateUp(), startPm2()));
}));

gulp.task('default', gulp.series('watch'));