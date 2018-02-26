# See-Eye-Vision

## Overview

Simple desktop application that supports remote control from a client application.  The application
displays a QR Code for the address of the application's embedded server.  The server uses websockets
to support realtime interaction between the client and application.

## Icon

Icon made by Bogdan Russo from www.flaticon.com (CC 3.0 BY)[https://creativecommons.org/licenses/by/3.0/]

## Mouse support

Mouse support is provided by robotjs which does not currently support Wayland display servers
(https://github.com/octalmage/robotjs/issues/304).

If you're using linux mouse support is currently provided for X11 and XOrg session, change your session
to use XOrg.

## Setup

1. Clone this repository.
2. Install node (if not already installed).
3. Run `npm install`.
4. Run `npm run start`.
5. Run `npm run electron-rebuild`.

## Scripts

The following scripts can be executed using `npm run` for convenience.

* `start` - start the application in production mode.
* `start:development` - start the application in development mode.
* `start:debug` - start the application in debug mode (enable chrome developer tools for all browser views).
* `start:doc` - start a dedicated server for the documentation created by `build:doc`.
* `build` - build both the application and the client for packaging.
* `build:client` - build only the client (using Webpack).
* `build:app:linux` - build only the application for packaging on linux systems.
* `build:app:win` - build only the application for packaging on windows systems.
* `build:app:osx` - build only the application for packaging on osx darwin systems.
* `build:doc` - build the documentation for all files in `./src/` using JSDoc3.
* `package:linux:rpm` - package the application for disttribution on x64 linux debian distro systems.
* `package:linux:deb` - package the application for disttribution on x64 linux redhat distro systems.
* `package:windows:msi` - package the application for disttribution on x64 windows systems.
* `package:osx:dmg` - package the application for disttribution on x64 osx darwin systems.
* `clean` - delete both the app and client builds.
* `clean:app` - delete only the app build.
* `clean:client` - delete only the client build.
* `test` - run all of the tests.
* `lint` - run eslint and fix anything that can be fixed automatically.

## Licence

```
Copyright 2018 Jack Galilee

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
