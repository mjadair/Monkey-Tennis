# MONKEY TENNIS <img src= assets/TennisMonkey.png height=50 width=80 />


## Overview <img src= assets/tennisball.png height=20 width=20 />

This is an ongoing project that I will be adding to sporadically. 

After completing my first game, [Space Wars]((https://mjadair.github.io/Space-Wars/) ), in vanilla JavaScript I sought out frameworks that could be used to more effectively make a JavaScript game rendered in the browser. This led me to [Phaser 3](https://phaser.io/). 

Whilst reading through the documentation, an episode of _I'm Alan Partridge_ was on TV in the background. The scene where Alan is desparately pitching programme ideas to a BBC TV Executive, ideas including _Youth Hostelling With Chris Eubank_ and _Monkey Tennis_. I thought I'd try my hand at making Alan's dreams of Monkey Tennis a reality. 

The game is essentially based on my childhood GameBoy favourite, _Breakout_. You control a monkey with a tennis racket, hitting a tennis ball at bananas to peel them. 

Youth Hostelling with Chris Eubank is unlikely to follow...

![Alan Partridge](https://media.giphy.com/media/PYEGoZXABBMuk/giphy.gif)

## Technologies Used <img src= assets/tennisball.png height=20 width=20 />

- HTML5
- JavaScript
- Git and GitHub
- Pixel Art
- [Phaser 3](https://phaser.io/)

## The Approach <img src= assets/tennisball.png height=20 width=20 />

### The Phaser Boilerplate

The project started using a typical Phaser boilerplate. Creating a `GameScene` class that extends the `Phaser.Scene` object. 

The class typically utilises three functions: `preload()` for preparing images and sounds ready for the game to use. `create()` for adding game logic and `update()` which listens for changes to the game's state and executes functions accordingly:

```js

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }
  
  preload() {
  ...
  }
  
  
  create() {
  ... 
  }
  
  
 update() {
   ...
   }
   
```

## The Config

Phaser requires a configuration object with certain stipulated keys in order for the game to render.

Here I have added physics to the game, a brilliantly useful tool that Phaser provides. I've also set the width and height of the canvas to match the window.innerWidth and window.innerHeight of the device being used so that the game experience is similar on mobile and desktop

```js
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade'
  },
  scene: [StartScene, GameScene, EndScene]
}

const game = new Phaser.Game(config)

``` 

