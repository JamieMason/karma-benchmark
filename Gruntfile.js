module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    concat: {
      dist: {
        src: [
          'src/perftacular.js',
          'src/benchmark-1.0.0.js'
        ],
        dest: 'perftacular-' + require('./package.json').version + '.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('build', ['concat:dist']);

};
