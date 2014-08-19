'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: {
        src: ['main.js', 'test/**/*.js'],
        options: {
          node: true,
          asi: true,
          unused: 'vars',
          globalstrict: true,
          eqeqeq: true,
          forin: true,
          latedef: true,
          quotmark: 'single',
          undef: true,
          trailing: true,
          lastsemic: true
        }
      }
    },
    tape: {
      files: ['test/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-tape');

  grunt.registerTask('default', ['jshint', 'tape']);
};
