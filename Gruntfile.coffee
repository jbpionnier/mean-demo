module.exports = (grunt) ->

  # Load all grunt tasks.
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    src:
      server: ['server.js', 'app/**/*.js']
      js: '<%= publicdir %>/js/**/*.js'

    publicdir: 'public'

    jshint:
      options:
        jshintrc: '.jshintrc'
      server: '<%= src.server %>'
      js: '<%= src.js %>'

    watch:
      server:
        files: '<%= src.server %>'
        tasks: 'jshint:server'
      js:
        files: '<%= src.js %>'
        tasks: 'jshint:js'

    nodemon:
      app:
        options:
          file: 'server.js'
          watchedExtensions: ['js']
          watchedFolders: ['app', 'server.js']
          ignoredFiles: ['app/views/**']
          delayTime: 1

    concurrent:
      target:
        options:
          logConcurrentOutput: true
        tasks: ['nodemon:app', 'watch']


  grunt.registerTask 'default', ['jshint', 'concurrent:target']
