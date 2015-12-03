# dashode

Simple & standalone HTTP requests realtime dashboard for clf based webservers.

It was designed to debug and monitor nginx instances but it should work with anything that features a clf log.

![dashode](https://raw.githubusercontent.com/apocas/dashode/master/dashode.jpg "dashode")

## Usage

### Install

 * npm install -g dashode
 * dashode (defaults to --log=/var/log/nginx/access.log --port=1337)
 * Point your browser to http://hostname:1337

### Options

 * dashode --log=/var/log/nginx/access.log --port=1337

## Support

 * Should support all web servers that support standard clf log format.
 * nginx, apache and others.

## Authentication

 * Dashode does not feature authentication, you should push that to a reverse proxy if you need it.

### nginx Authentication example
 ```
server {
  listen 8080;
  server_name ~^(.+)$;

  location / {
    auth_basic "Restricted";
    auth_basic_user_file /var/nginx/passwd;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;

    proxy_pass http://127.0.0.1:1337/;
  }
}
```

## Design notes

 * Usage must be stupid simple
 * Monolithic/self-contained
 * Stateless & realtime only
 * Behave like a debug tool / bragging dashboard

## License

Pedro Dias - [@pedromdias](https://twitter.com/pedromdias)

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

    http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.
