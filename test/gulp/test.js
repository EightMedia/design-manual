import test from 'ava';
let fs = require('fs');
let rimraf = require('rimraf');
let gulp = require('gulp');

let isThere = require('is-there');
let DM = require('../../lib/index');

let config = {
  output: __dirname + '/tmp/',
  pages: __dirname + '/',
  components: './test/components.json',
  meta: {
    domain: 'website.com',
    title: 'Design Manual'
  }
}

test.cb('gulp', t => {
  t.plan(1);
  rimraf.sync(__dirname + '/tmp');

//   setTimeout(() => {
//     gulp.run('design-manual', () => {
//       console.log('first: should never finish');
//       t.fail();
//       t.end();
//     });
//   }, 1);

//   setTimeout(() => {
//     gulp.run('design-manual', () => {
//       console.log('second: should never finish');
//       t.fail();
//       t.end();
//     });
//   }, 750);

  setTimeout(() => {
    gulp.run('design-manual', () => {
      console.log('third: should finish');
      t.pass();
      t.end();
    });
  }, 0);
});

gulp.task('design-manual', done => {
  DM.build(Object.assign({}, config, {
    onComplete: function () {
      done();
    }
  }));
});