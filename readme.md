##Setup:

    $ git clone git@github.com:ivuniq/baloon-test.git
    $ cd baloon-test
    $ npm install
    $ npm install -g browserify
    $ browserify -t hbsfy app.js -o bundle.js
    $ python -m SimpleHTTPServer 
    $ open 0.0.0.0:8000

##Development: 

    $ npm install -g watchify
    $ npm install -g hbsfy
    $ watchify -v -t hbsfy app.js -o bundle.js
