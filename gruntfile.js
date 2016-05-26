module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)

  require('time-grunt')

  var config = {
    dist : 'public',
    src : 'src',
    views: 'app/views'
  }

  grunt.initConfig({

    config : config,

    // 清除文件
    // 文档：https://www.npmjs.com/package/grunt-contrib-clean
    clean: {
      dist: {
        src:['<%= config.dist %>']
      }
    },

    // 复制文件
    // 文档：https://www.npmjs.com/package/grunt-contrib-copy
    copy: {
      img: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/img',
            src: ['{,*/}*.{png,jpg,gif}'],
            dest: '<%= config.dist %>/img'
          }
        ]
      }
    },

    // jade编译
    // 文档：https://www.npmjs.com/package/grunt-contrib-jade
    // jade:{
    //   dist: {
    //     options: {
    //       pretty:true
    //     },
    //     files:[{
    //       expand:true,
    //       cwd:'<%= config.src %>/jade',
    //       src:['*.jade'],
    //       dest:'<%= config.dist %>',
    //       ext:'.html'
    //     }]
    //   }
    // },

    imagemin: {
      dist: {
        files:'<%= copy.img.files %>'
      }
    },

    uglify: {
      dist: {
        files:[{
          expand:true,
          cwd:'<%= config.src %>/js',
          src:['{,*/}*.js'],
          dest:'<%= config.dist %>/js'
        }]
      }
    },

    jshint: {
      gf: 'Gruntfile.js'
    },

    // 并行执行tasks 加快grunt速度
    // 文档：https://www.npmjs.com/package/grunt-concurrent
    concurrent: {
      dev: [
        'copy:img',
        'less'
        // 'jade'
      ],
      last: [
        'imagemin:dist',
        'less',
        'uglify'
      ]
    },

    // usemin的另一个tasks
    // 文档：https://www.npmjs.com/package/grunt-usemin
    useminPrepare: {
      options: {
        root: 'mobile_app',
        dest: '<%= config.dist %>'
      },
      html: '<%= config.views %>/{,*/}*.jade'
    },

    usemin: {
      options: {
        assetsDirs: [
        '<%= config.dist %>',
        '<%= config.dist %>/css',
        '<%= config.dist %>/img'
        ],
        patterns: {
          'jade': require('usemin-patterns').jade
        }
      },
      jade: ['<%= config.views %>/{,*/}*.jade'],
      // html: ['<%= config.dist %>/*.html'],
      css: ['<%= config.dist %>/css/*.css']
    },

    // less编译器
    // 文档：https://www.npmjs.com/package/grunt-contrib-less
    less: {
      dest: {
        files:[{
          expand:true,
          cwd:'<%= config.src %>/css',
          src:['*.less', '!common.less'],
          dest:'<%= config.dist %>/css',
          ext:'.css'
        }]
      }
    },

    // 自动添加厂商前缀
    // 文档：https://www.npmjs.com/package/autoprefixer
    // autoprefixer: {
    //   options: {
    //     browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    //   },
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd:'<%= config.dist %>/css',
    //       src:'{,*/}*.css',
    //       dest: '<%= config.dist %>/css'
    //     }]
    //   }
    // },

    // 文件MD5命名
    // 文档：https://www.npmjs.com/package/grunt-rev
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/css/{,*/}*.css',
            '<%= config.dist %>/img/{,*/}*.{jpg,png,gif}'
          ]
        }
      }
    },

    // 文件监控
    // 文档：https://www.npmjs.com/package/grunt-contrib-watch
    watch: {
      less: {
        files:['<%= config.src %>/css/*.less'],
        tasks:['newer:less']
      },
      jade: {
        files: ['<%= config.views %>/**'],
        options: {
          livereload: true
        }
      },
      express: {
        files: [ 'app.js', 'app/controllers/{,*/}*.js' ],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
      // jade: {
      //   files:['<%= config.src %>/jade/*.jade'],
      //   tasks:['newer:jade']
      // },
      // livereload: {
      //   options: {
      //     livereload: '<%= connect.options.livereload %>'
      //   },
      //   files:['dist/{,*/}*']
      // }
    },

    // ExpressJs服务
    express: {
      options: {
        port: 1513
      },
      dev: {
        options: {
          script: 'app.js'
        }
      }
    }

    // 服务连接
    // https://www.npmjs.com/package/grunt-contrib-connect
    // connect: {
    //   options: {
    //     port:4399,
    //     livereload: 43998,
    //     hostname:'*'
    //   },
    //   website: {
    //     options: {
    //       open:true
    //     }
    //   }
    // }
  });

  grunt.registerTask('default', [
    'clean:dist',
    'concurrent:dev',
    'useminPrepare',
    // 'autoprefixer',
    'rev',
    'usemin',
    // 'connect',
    'express',
    'watch'
  ])

  grunt.registerTask('last', [
    'clear:dist',
    'concurrent:last',
    'useminPrepare',
    // 'autoprefixer',
    'rev',
    'usemin'
  ])
}
