module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['public/**'],
      tasks: ['deploy']
    },

    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
      },
      dist: {
        src: [
          'public/javascript/**.js'
        ],
        dest: 'public/javascript/vendor.js'
      }
    },

    exec: {
      sass: 'sass scss/style.scss:public/stylesheets/style.css --style compressed',
      upload: 'aws s3 sync public s3://devesh.in --delete --acl public-read --cache-control "public, max-age=86400" --exclude "*/.DS_Store"',
      website: 'aws s3 website s3://devesh.in --index-document index.html --error-document error.html',
      cleanup: 'aws s3 rm s3://devesh.in --recursive --exclude "*" --include "*/.DS_Store"',
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('deploy', ['concat', 'exec']);
};



