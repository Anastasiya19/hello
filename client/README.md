# README #

## HelloVinci

This README would normally document whatever steps are necessary to get your application up and running.

### Installation

```bash 
git clone IrinaDunice@bitbucket.org:IrinaDunice/hellovinci.git
```
### How run? 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites 
What things you need to install the software and how to install them.

* [node](https://nodejs.org/en/download/package-manager/#macos)
* [nmp](https://www.npmjs.com/get-npm)
* [gulp](https://gulpjs.com/)
* [bower](https://bower.io/#install-bower)
 
#### Running
```bash 
npm install
bower install
gulp
```

### Built With 

* [Gulp](https://gulpjs.com/)- is a toolkit for automating painful or time-consuming tasks in your development workflow;
* [Bower](https://bower.io/) - is a package manager for the web. 
  
  Bower is optimized for the front-end. If multiple packages depend on a package - jQuery for example - Bower will download jQuery just once. This is known as a flat dependency graph and it helps reduce page load.


##Project Structure

```
.
├── build                    # All build-related code
├── src                      # Application source code
│   ├── **.html              # HTML pages
│   ├──template              # Html for duplicate code (like header, footer etc)
│   │  └── **.html           # HTML code
│   ├── styles               # Folder with all styles 
│   │   ├── main.scss        # Main style file, which including all others styles in this folder 
│   │   ├── _mixin.scss      # Mixins and functions for styles
│   │   ├── _normilize.scss  # Elements normalization and polyfills
│   │   └── modules          # Folder with styles for elements
│   ├── js                   # Folder for js 
│   │   ├── custom           # Sripts which imported in main.js
│   │   └── main.js          # Main style file, which including all scripts in project 
│   └── assets               # Folder for fonts and images
│       ├── fonts            # Fonts
│       └── images           # Images      
├── node_nodules             # Folder for modulues npm
└── bower_componets          # Bower'll placed files to here
    
```
### Links 

##### [Gulp](https://gulpjs.com/)

* [Getting Started with Gulp](https://travismaynard.com/writing/getting-started-with-gulp)