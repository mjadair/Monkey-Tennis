# MONKEY TENNIS <img src= assets/TennisMonkey.png height=50 width=80 />


## Overview <img src= assets/tennisball.png height=20 width=20 />

[Play the game here!](https://mjadair.github.io/Monkey-Tennis/)

This is an ongoing project that I will be adding to sporadically. 

After completing my first game, [Space Wars]((https://mjadair.github.io/Space-Wars/) ), in vanilla JavaScript I sought out frameworks that could be used to more effectively make a JavaScript game rendered in the browser. This led me to [Phaser 3](https://phaser.io/). 

Whilst reading through the documentation, an episode of _I'm Alan Partridge_ was on TV in the background. The scene where Alan is desparately pitching programme ideas to a BBC TV Executive, ideas including _Youth Hostelling With Chris Eubank_ and _Monkey Tennis_. I thought I'd try my hand at making Alan's dreams of Monkey Tennis a reality. 

The game is essentially based on my childhood GameBoy favourite, _Breakout_. You control a monkey with a tennis racket, hitting a tennis ball at bananas to peel them. 

Youth Hostelling with Chris Eubank is unlikely to follow...

![Alan Partridge](https://media.giphy.com/media/PYEGoZXABBMuk/giphy.gif)

## Technologies Used <img src= assets/fruit_banana.png height=20 width=20 />

- HTML5
- JavaScript
- Git and GitHub
- Pixel Art
- [Phaser 3](https://phaser.io/)

## The Approach <img src= assets/banana_peel.png height=20 width=20 />

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

### The Config

Phaser requires a configuration object with certain stipulated keys in order for the game to render.

Here I have added physics to the game, a brilliantly useful tool that Phaser provides out of the box. I've also set the width and height of the canvas to match the `window.innerWidth` and `window.innerHeight` of the device being used so that the game experience is similar on mobile and desktop. 

The scene key has an array containing the three game states. The beginning of the game, prior to the user clicking, the game itself and the game over screen.

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


### Game Logic

The game logic was fairly straightforward to implement once I had gotten to grips with the variety of basic tools that Phaser provides. 

Below is an example of how straightforward it was to write the logic that moves the player's monkey character. This works for both mouse movement on desktop and swiping interaction on mobile.

```js
   this.input.on('pointermove', function (pointer) {

      this.monkey.x = Phaser.Math.Clamp(pointer.x, 52, window.innerWidth)

      if (this.ball.getData('onMonkey')) {
        this.ball.x = this.monkey.x
      }

    }, this)
    
```

<img  src=assets/Screenshots/StartDesktop1.png width=500> <img  src=assets/Screenshots/StartMobile.png height=250> 


Below is an example of another Phaser-specific feature, collision detection. Which I used to detect collision between the ball and the bananas, removing the banana that was struck and replacing it with a banana peel that is assigned `setGravity` so that it drops directly downwards.

```js
  this.physics.add.collider(this.ball, this.bananas, (ball, banana) => {
      this.sound.play('ballbouncing')
      banana.destroy()
      this.physics.add.sprite(banana.x, banana.y, 'bananapeel').setScale(.05).setGravity(0, 400)
      this.scoreText.setText(`Bananas Left: ${this.bananas.getChildren().length}`)

    })
```


Gravity, velocity and physics are all provided by Phaser, so I won't pore over the specific logic for the whoke game here. The challenge was mostly understanding the framework, rather than writing hugely complicated logic. Do take a look at the source code if you're interested. 


<img  src=assets/Screenshots/GamplayDesktop3.png width=500> <img  src=assets/Screenshots/GamplayMobile2.png height=250> 


## Challenges <img src= assets/tennisball.png height=20 width=20 />
- This was all about learning a simpler way of building a game using the JavaScript language that is more powerful than using plain vanilla JavaScript as per my first project. With this, the biggest challenge was to implement the framework as per Phaser's documentation. 



## Successes <img src= assets/fruit_banana.png height=20 width=20 />

- I'm really pleased with how I was able to make the gaming experience similar on mobile and desktop.

- Understanding the framework and implementing physics was really exciting. 



## Future features <img src= assets/banana_peel.png height=20 width=20 />

I'm going to keep working on this game and adding features when I become more familiar with Phaser. Features I aim to add will include:

- A life system, based on the player's monkey avatar dodging the dropping banana peels. The player will lose a life if they are hit by a falling banana peel.

- A points system based on falling peeled bananas. Some of the falling banana peel will be replaced by a banana which the player can catch for bonus points. 

- A progression system, adding extra scenes that increase the diffifulty if a player completes a level. 


## Credits

Sound effects obtained from [Zapsplat](https://www.zapsplat.com)


<img  src=assets/Screenshots/GameOverDesktop.png> 



### [Play the game now!](https://mjadair.github.io/Monkey-Tennis/)



