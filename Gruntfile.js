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
      react: {
        files: path.join(process.cwd(), './src/js/sea-modules/app/view/**/*.jsx'),
        tasks: ['react']
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