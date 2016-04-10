module.exports = function(grunt) {
  grunt.initConfig({
    ngAnnotate: {
      options: {
        // Task-specific options go here. 
      },
      app1: {
        files: {
          'static/js/app.js': ['static/js/app2.js'],
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.registerTask('default', ['ngAnnotate']);
}
