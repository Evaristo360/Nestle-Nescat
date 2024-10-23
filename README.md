## Contents

- [1. Description](#1-description)
- [2. Prerequisites](#2-prerequisites)
- [3. File tree](#3-file-tree)
- [4. Environments](#4-environments)
- [5. Installing and running](#5-installing-and-running)

# 1. Description

The Nestlé DASH is a project to manage digital displays, branch offices, products, advertisements, customers and promotions

# 2. Prerequisites

Building the Nestlé DASH requires the following tools:

- [x] [Node.js 14+](https://nodejs.org/en/) (14.15+ recommended)
- [x] [React.js 17.0.1](https://es.reactjs.org/) 
- [x] [GIT](https://git-scm.com/)
- [x] [PM2](https://pm2.keymetrics.io/) or [nodemon](https://nodemon.io/) (Optional to automatically manage and reload the project.)
- [x] Clone this project from its repository using `git clone` and one of the next:
  - Clone with **SSH**
    ```
    git@springlabsdevs.net:nestle/nestle-nestca-dashboard-front.git
    ```
  - Clone with **HTTPS**
    ```
    https://springlabsdevs.net/nestle/nestle-nestca-dashboard-front.git
    ```

# 3. File tree

The project has the following organization:

```
.
├── public
│   ├── app-icon
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── _redirects
│   └── robots.txt
├── scripts
│   └── analyze.js
├── src
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── layouts
│   ├── providers
│   ├── routes
│   ├── scss
│   ├── translations
│   ├── utils
│   └── views
├── ecosystem.config.js
├── server.js
├── README.md
├── setup.js
├── jsconfig.json
├── LICENSE   
├── package.json
└── webpack.config.js
```

- **src/assets:** All media (images, videos, audios, etc)
- **src/components:** files containing react components,
- **src/hooks:** All global react hooks
- **src/layouts:** All layouts to avoid repeating code (in views)
- **src/providers:** Configuration and javascript code that in not a react component 
- **src/routes:** Application routes (public and private), with react-router-dom pattern
- **src/scss:** Scss and sass files (common for the project)
- **src/translations:** Application messages for all supported languages (generated automatically with $ yarn extract-intl) 
- **src/utils:** Common functions (recommended use provider pattern instead this folder) 
- **src/views:** All application pages, divided by module
- **build:** contains the builded code, in other words, the compiled project.
- **ecosystem.config.js:** contains the instructions that allow to run the project using the PM2 tool.
- **package.json:** list of packages installed.
- **README.md:** this document.
- **server.js:** the project entry point.
- **webpack.config.js:** contains the instructions that allow to build and compile the project.

# 4. Environments

Run `yarn setup` to create .env file and install dependencies

```
# Enviromanet variables availables in compile time (reference with process.env.REACT_APP_NAME_VAR)
REACT_APP_NAME=$npm_package_name # project name in package.json file
REACT_APP_VERSION=$npm_package_version # project version in package.json file
REACT_APP_PUBLIC_URL=/nestcadash/ # project url prefix, example: localhost:5000/nestcadash/
REACT_APP_PUBLIC_TITLE=Nestlé Nestca Dashboard # title showed in main page
REACT_APP_LANGUAGE_CODE=es-mx # default language configuration
REACT_APP_THEME_ENABLE_BROWSER_SUPPORT=false # enable theme support
REACT_APP_DEFAULT_THEME=dark # default color pallete
REACT_APP_DASH_URL=http://localhost:5000/nestcadash # the final project url (domain + prefix)
REACT_APP_PREFIX_STORAGE=nestca-dash- # project local storage prefix (specify this when you have multiple dashboard in a single domain)
REACT_APP_MAIN_BACKEND_URL=https://pruebas4.springlabsdevs.net/nestca-api # api url without '/' character at the end
REACT_APP_CHECK_ROUTE_PERMS=false # enable strict permissions check per view (this hide views for unauthorized user even though user types url manually)

# Server configuration
HOST=localhost # project host
PORT=5000 # project port
TLS_ENABLED=false # enable https
TLS_CERT=server.cer # path to .cer file for https
TLS_KEY=server.keyy # path to .key file for https

# Webpack configuration
# Warning! only if you know what you do modify this 
BUNDLE_FILENAME=nestle-nestca-dashboard.octopy.js # builded file name
CHUNK_FILENAME=[name].nestca.js # chunk file name
BUILD_DIR=./build # build directory
MODE=development # compile mode (production or development)
COMPRESS=false # compress compiled code (this needs more memory, at least 4gb)

```

# 5. Installing and running

1. Change to nestle-nestca-dashboard-front folder

```
$ cd nestle-nestca-dashboard-front 
```

2. Install all packages and create .env file
   ```
   $ yarn setup 
   ```
   or manually
   ```
   $ cp .env.example .env && yarn install
   ```
3. Compile the project
   ```
   $ yarn build 
   ```
4. Run the project:

   - Without tools `(node server.js)`
     ```
     $ yarn start:prod 
     ```
   - With PM2:

     ```
     $ pm2 start ecosystem.config.js
     ```

     Set the correct path to node version in the `ecosystem.config.js` 

     **Note:** to interact with the local API, you must first start the API.

