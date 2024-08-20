# RGBdle
**URL**: https://www.rgbdle.page/

It's Wordle, but for colors! Specifically, for RGB values.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Spoilers!!
If you want to spoil the game for yourself, I've tucked away the colors array in a subfolder. In the future I want this to be in a database so people can't cheat.

## About
I made this as an exercise for myself to cement some knowledge about React and Material UI, as well as to try out hosting a React app on AWS Amplify. 
It's just a fun little game based on Wordle's style, where users have 6 attempts to guess an RGB value. There's hints along the way. 

## Goals for the Future
### Features
- [X] **Clean up code**: I added features a bit haphazardly, and would like to re-organize the code.
- [ ] **a11y**: Make the page & game more accessible. 
- [ ] **Stats**: Like Wordle, display stats for the user based on their play history. Likely using a cookie.
- [ ] **No refresh**: Store user's score for the day, no replay on refresh.
- [ ] **Favicon**
- [X] **Contrast toggle**: Sometimes the function to calculate either black/white to contrast on each individual guess doesn't work super well, so I want to add a toggle to make it possible for the user to switch the text between black and white themselves.
- [ ] **Backend DB**: For storing the colors away from public view. Probably using Amplify backend.
- [ ] **Contributing**: I want to make a contributing guide so people can submit colors, feature ideas, and code!
- [ ] **Better mobile display**
- [ ] **Copy to clipboard on mobile**
- [ ] **Automate testing with Cypress**
