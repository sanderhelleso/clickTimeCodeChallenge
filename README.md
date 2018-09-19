# clickTimeCodeChallenge
Software Engineer Intern Challenge by ClickTime - Sander Hellesø
<br>
<br>
Professor Higginbotham has challenged you to a race around the world in a steam-powered zeppelin of your own invention. In order to verify your time at each leg of the race, you will need to create a stopwatch web application consisting of a start/stop button and a history table. Each time you start the stopwatch, the application inserts a new row into the history table that records the start time, and the current latitude and longitude. When you stop the stopwatch, the application will record the time, latitude, and longitude, as well as the amount of time that has elapsed.

<img src='https://github.com/sanderhelleso/clickTimeCodeChallenge/blob/master/client/public/img/clickTimeGif.gif' alt='GIF of application'>

## Features

<ul>
  <li>Track time elapsed from start / stop time even when changing timezones</li>
   <li>Get current timestamp of start / stop time and display in correct format</li>
  <li>Get current location of start / stop time and display correctly</li>
  <li>App uses LocalStorage so app is availabe offline aswell as data is saved on browser quit</li>
  <li>React state application to easy and clearly update component on state change</li>
  <li>Good, clear and modern UX and UI, should be easy to use for user</li>
  <li>Responsive grid layout</li>
</ul>

### Installing

```
git clone https://github.com/sanderhelleso/clickTimeCodeChallenge.git
cd clickTimeCodeChallenge
cd client
npm install
npm run build
npm start
```

### Edit and modifying of component

```
Component state is set and updated in various steps of the application,when offline the
application will utilize localstorage to keep track of rows and corresponding history data. 
In a more realistic situation should the Stopwatch component be splitted into multiple smaller components (History, HistoryRow, Buttons ++) and it could be debated if new history rows should be inserted before or after previous entry.
```

## Built With

* React
* Animate.css
* Feathericons

## Authors

* **Sander Hellesø**

## License

This project is licensed under the MIT License

## Acknowledgments

* Thanks to ClickTime for a fun and interesting project

## Notes

<ul>
  <li>Added GIF displaying some of the various stages of the application</li>
  <li>Layout is based on a modern, dark color theme</li>
  <li>Added some minor usefull things like disabled button while fetching geo location to avoid spam</li>
  <li>If you have issues running this locally please contact me ASAP</li>
</ul>

