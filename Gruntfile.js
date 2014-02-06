module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    jshint: {
      benchmark: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'lib/perftacular.js',
          'adapter.js',
          'index.js'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
