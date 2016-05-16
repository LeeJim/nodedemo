module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		clean: {
			common: {
				src:['dist/{css,img}/*', 'dist/*.html']
			}
		},

		copy:{
			script: {
				files:[{
					expand:true,
					cwd:'src/',
					src:'{,*/}*.js',
					dest:'dist/js',
					ext:'.js'
				}]
			},
			lib: {
				files:[{
					expand:true,
					cwd:'lib/',
					src:'**',
					dest:'dist/lib',
				}]
			},
			image: {
				files:[{
					expand:true,
					cwd:'src/img',
					src:'**',
					dest:'dist/img',
				}]
			}
		},

		less: {
			dist: {
				files:[{
					expand:true,
					cwd:'./src/css/',
					src:'{,*/}*.less',
					dest:'./dist/css/',
					ext:'.css'
				}]
			}
		},

		connect: {
			options: {
				port: 3000,
				livereload: 43998
			},
	    server: {
	      options: {
	        open:true,
	        hostname: '*',
	        base: './dist'
	      }
	    }
		},

		jade: {
			options: {
				data: {
					pretty:true,
					debug:true
				}
			},
			html: {
				files:[{
					expand:true,
					cwd:'./views',
					src:'*.jade',
					dest:'./dist',
					ext:'.html'
				}]
			}
		},

		watch: {
			style: {
				files: ['src/css/{,*/}*.less'],
				tasks: ['newer:less:dist']
			},
			script: {
				files: ['src/js/{,*/}*.js'],
				tasks: ['newer:copy:script:script']
			},
			jade: {
				files: ['views/{,*/}*.jade'],
				tasks: ['jade']
			},
			copyImage: {
				files: ['src/img/**'],
				tasks: ['copy:image']
			},
			livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files:['dist/{,*/}*']
      }
		}
	});

	grunt.registerTask('default', ['clean', 'jade', 'copy', 'less', 'connect', 'watch']);

}