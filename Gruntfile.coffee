module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    bump:
      options:
        files: ['package.json', 'bower.json', 'icbiacontrol.jquery.json']
        commit: true
        commitFiles: ['-a']
        createTag: true
        push: false

  # Load grunt plugins
  grunt.loadNpmTasks 'grunt-bump'
