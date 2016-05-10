module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		clean: {
			common: {
				src:['dist','!dist/lib/*']
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
	    server: {
	      options: {
	        port: 3000,
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
			dist: {
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
			}
		}
	});

	grunt.registerTask('default', ['clean', 'jade', 'copy', 'less', 'connect', 'watch']);

}