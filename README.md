

### LESS compiler
This is used in conjunction with the YUI shifter tool.

##### Install Dependencies
nodejs
npm

#### Build Dependency
make

##### How to install
Run this command in the project directory:

> make install

To do an install without make, run:

> npm install -g .

##### How to use with YUI Shifter

For each YUI module, add the less-compile command to the build.json under the exec option.

>"exec": [
>  "less-compile"
>]