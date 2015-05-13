# Emails

* Put templates in `./templates`
* Put styles in `./styles` (root file is `main.styl`)
* Run `npm install; npm start` and a live reloading server will start and open your browser at http://localhost:3999
* Emails will be compiled into `./html_templates` with css from main.styl inlined


## Templates

* You can use anything that jade supports to compile your templates (includes for layout files for example.
* You can nest templates arbitrarily deep, anything that's a `.jade` file will be compiled into the equivalent place in `html\_templates`
