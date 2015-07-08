module.exports = function(grunt) {

    // 1. Toda la configuración va aqui
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 2. Configuramos las diferentes tareas.

        clean: {
            build: [
                'dist'
            ]
        },

        concat: {
            dist: {
                src: [
                    'src/js/jquery.min.js',
                    'src/js/jquery.diagram.js',
                    'src/js/jquery.dropotron.min.js',
                    'src/js/jquery.scrollgress.js',
                    'src/js/owl.carousel.min.js',
                    'src/js/jquery.magnific-popups.min.js',
                    'src/js/jquery.range-min.js',
                    'src/js/*.js'
                ],
                dest: 'dist/js/main.js'
            }
        },

        sass: {
            options: {
                sourcemap: 'none',
                style: 'expanded',
                require: 'susy'
            },
            dist: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: [
                    '**/*.{png,jpg,gif,html,php}',
                    '**/*.css',
                    '**/js/privado/*.js',
                    '**/js/tinymce/**/*.{js,woff,ttf,svg,eot}',
                    '**/js/jquery.min.js'
                ],
                dest: 'dist/',
                filter: 'isFile',
            },
        },

        watch: {
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass'],
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['concat'],
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy'],
                options: {
                    livereload: true,
                },
            },
            php: {
                files: ['src/**/*.php'],
                tasks: ['copy'],
                options: {
                    livereload: true,
                },
            },
            svg: {
                files: ['src/**/*.svg'],
                tasks: ['svgmin'],
                options: {
                    livereload: true,
                },
            },
            img: {
                files: ['src/img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    livereload: true,
                },
            },
        }

    });

    // 3. Indicamos a Grunt los plugins que utilizaremos
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');


    // 4. Definimos los distintos tasks que se ejecutaran desde la terminal
    grunt.registerTask('default', [
        'clean', 'concat', 'sass', 'copy', 'watch'
        ]);

};