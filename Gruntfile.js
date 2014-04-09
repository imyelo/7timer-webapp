module.exports = function(grunt) {
  var path = require('path');
  var PORT = 8003;
  grunt.initConfig({
    connect: {
      client: {
        options: {
          port: PORT,
          base: './src'
        }
      }
    },
    react: {
      core: {
        files: [
          {
            expand: true,
            cwd: 'src/js/sea-modules/app/core/',
            src: ['**/*.jsx'],
            dest: 'src/js/sea-modules/app/core/',
            ext: '.js'
          }
        ]
      },
      view: {
        files: [
          {
            expand: true,
            cwd: 'src/js/sea-modules/app/view/',
            src: ['**/*.jsx'],
            dest: 'src/js/sea-modules/app/view/',
            ext: '.js'
          }
        ]
      }
    },
    watch: {
      reactCore: {
        files: path.join(process.cwd(), './src/js/sea-modules/app/core/**/*.jsx'),
        tasks: ['react:core']
      },
      reactView: {
        files: path.join(process.cwd(), './src/js/sea-modules/app/view/**/*.jsx'),
        tasks: ['react:view']
      },
      js: {
        files: path.join(process.cwd(), './src/js/**/*.js'),
        options: {
          livereload: true
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:' + PORT + '/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['connect', 'open', 'watch']);

};