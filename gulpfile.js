const gulp = require('gulp');
const sftp = require('gulp-sftp');
gulp.task('default',function () {
    return gulp.src('dist/**')
        .pipe(sftp({
            remotePath: '/var/tomcat/webapps/ROOT/resources/test/',
            host: '120.24.65.223',
            user: 'tomcat',
            port:"22",
            pass: 'MTdhY2RiMTA0Njc4YTBhMzYw'
        }));
});
