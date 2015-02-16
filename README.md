# dashode

Simple & standalone HTTP requests realtime dashboard for clf based webservers.

It was designed to debug and monitor nginx instances but it should work with anything that features a clf log.

![dashode](https://raw.githubusercontent.com/apocas/dashode/master/dashode.png "dashode")

## Usage

### Install

 * git clone https://github.com/apocas/dashode
 * cd dashode
 * npm install
 * node main.js

### Options

 * node main.js --log=/var/log/nginx/access.log --port=1337

## Support

 * Should support all web servers that support standard clf log format.
 * nginx, apache and others.

## Design notes

 * To feature a stupid simple usage
 * Monolithic/self-contained
 * Realtime only
 * Behave like a debug tool / bragging dashboard

## License

Pedro Dias - [@pedromdias](https://twitter.com/pedromdias)

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

    http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.
