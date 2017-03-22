# Skurt Real Life Interview
*HOW DOES PROGRAMMING TAKE SO LONG
YOU LITERALLY JUST TYPE WHAT YOU WANT IT TO DO
THIS SHOULD BE EASY*

~ Jessie Newman ([@RainbowThyme](https://twitter.com/RainbowThyme/status/667118579075141632))

## Project Structure
***Directory Layout***

```
+ app/
  + environment/
    - development.js
    - production.js
  + src/
    + components/
    + images/
    + less/
      - _variables.less
      - app.less
    + views/
    + models/
    + utils/
    - Index.js
  - index.html
  - index.js
  - gulpfile.babel.js
```

In the `environment/` folder, there exists two files: `development.js` and `production.js` here you can specify environment configs. 

** Note that when you run `gulp watch` you will be running in `development` mode. You may also choose to run `NODE_ENV=production gulp watch` to run a local server using production configurations.

Now let's take a closer look at the `src/` folder. The project is setup where all the source code is found in the `src/` folder. This is the folder that you will primarily be working in. When the project is built, a `dist/` folder will be created with the a compiled, deployable version of the code.

The `src/` folder has the following project layout:

```
  + src/
    + components/
    + images/
    + less/
      - _variables.less
      - app.less
    + views/
    + models/
    + utils/
    - Index.js
```

The `components/` directory contains React components, widgets, basically just small pieces that will make up `views` which are found in the `views/` folder. While they are both pretty much the same in terms of code, our convention is that modules in the `components/` directory will _never_ have a `default export`, and vice versa for views. Views are also fed directly into the Router which is instantiated in `Index.js`.

The `models/` directory contains modules that have to do with data storage, retrieval, manipulation, just how we manage in-memory data.

The `utils/` directory contains purely utility modules that can be used throughout the project.

## Development Dependencies
### React.js
This is Facebook's View-Rending framework. It boasts composability, which means that each view or component is composed of multiple components. Each component also has a lifecycle of its own, and are generally independent of each other.

Read the documentation [here](https://facebook.github.io/react/docs/getting-started.html).

### Babel.js
Usually, I like to say this is what JavaScript WILL become. It follows ES6 guidelines, and provides a lot of cool features that promote writing of clean (Object/Class/Inheritance, whatever you want to call it) code. Facebook's React also has built in support for Babel.

Read the documentation [here](https://babeljs.io/docs/learn-es2015/).

### Node.js
While we do have a server component to this project, it is mainly to serve the client app. Node.js is used for build automation, dependency injection, and gloriously, [Browserify](http://browserify.org/), allowing us to inject Node dependencies into our client code.

### Bower.js
Front end dependency manager. We pretty much only use this for bootstrap, font-awesome, and css stuffs.

## Deps
### React Bootstrap
A library that makes implementing most of what Bootstrap has to offer very easy. Read the documentation [here](https://react-bootstrap.github.io/components.html)

### Font-Awesome
While bootstrap already has glyphicons, we also use some font-awesome icons as well. These can be found [here](https://fortawesome.github.io/Font-Awesome/icons/)

### Lodash.js
An utility library for handling native objects and arrays. However, it does not yet support ES6 Maps, Sets, Iterators, etc.

## Setup
### Installation
Make sure that you have Node.js installed. After you clone the repo:

```
$ npm install
$ bower install
```
## Run Locally
We use nodemon to run the server locally. You can start a local server in development mode with:

```
$ gulp watch
```

## Tasks


Below are the tasks you are asked to complete. They are not necessarily in any order, but obviously it makes to do some before others, your choice. You have a lot of flexibility, but more importantly, be realistic. If you have any questions, please feel free to google it. If you can't find it on google, we will help you google.


1. Set up the repository locally and make sure Gulp works.
2. Create a new branch with your name. You're going to commit each of the tasks with a different commit message.
3. Create a dashboard view on the front-end. On this page, you will create a google.com like screen, except the Google logo will be replaced by Skurt logo (lives in images). You don't need all the stuff in the header or footer on the real google, just logo, text box and one button (I'm feeling lucky is optional).
4. The purpose of this is to make a flight status tracker. When we enter a flight number in the above field, we want to display how late the flight's arrival will be. Don't really care where the departure/destination is, just the delay (if any). We also only care about flights in the next 24 hours. If there are multiple with the same flight number, just worry about it's final leg. In order to do this, we will use the [Flightstats API](https://developer.flightstats.com). The application id is `91b929e6` and the key is `2eebba75c50ce13c31b9ef0b331fb93a`.
5. If you haven't already, we want to see an error message if something is wrong with the input (e.g. not a flight, non-existant flight number, flight not in the next 24h).
6. (optional) Create a component that basically wraps around the above textbox. We want to be able to do something like: `<FlightStatusField flightNum={flightNum}/>` from our dashboard html and do the same thing as above.
7. (extra optional) Create a `FlightStatusModel` which will communicate with the component or view. The `FlightStatusModel` should extend `EventListener` (found in `src/utils/EventListener.js`). Change `FlightStatusField` so that it will take in a `FlightStatusModel` instead of a `string`. 
    - `FlightStatusModel`'s constructor should in flight number, and it will have 2 properties:
    - `status`: `success|error|pending` flight info fetch status.
    - `getFlightInfo()`: returns flight information.
8. Once done, just push to the repo and you're all set.
