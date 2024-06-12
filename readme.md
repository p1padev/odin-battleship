# The Odin Project - Battleship

## Project Overview

Battleship is a classic strategy game where players try to sink each other's ships by guessing their locations on a grid. This project is a web-based implementation of the game, developed using vanilla JavaScript and TDD with Jest. It follows modern web development practices as it is the conclusion of the The Odin Project JS module.

Project deploy available at: [Github Pages](https://p1padev.github.io/odin-battleship/)

## Introduction

I believe this project particularly explains a lot about my ongoing journey as a software developer. After 2 years in this field, I decided it was time to take multiple steps back and revisit everything I know about programming and JavaScript. Although this project alone doesn't sum up my skills, I see it as a interesting historical document for myself. I can see many changes in my perspective on writing code and the way I approach building a project. I feel much more confident about JavaScript and how it works, and I was also able to test many concepts that, until recently, felt very challenging to understand.

In the end, I believe this was 100% a "laboratory" for me and my skills. There are many things I would do differently now, but I only know this after going through the process of trial and error. Doing all of this using only vanilla JS, Jest, and core libraries for modern web development was a game-changer. Using only the basics with up-to-date syntax (ES6+) was particularly enlightening. I think an important step for me in the future is to come back here to evaluate what I've done, understand my thought processes, and identify areas for improvement and things that, by then, I have already improved (one key area I'm considering right now is code architecture).

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/p1padev/odin-battleship.git
   ```
2. Navigate to the project directory:
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the project:
   ```bash
   npm run start
   ```

## Features

- Player vs. Player gameplay
- Player vs. Computer gameplay
- Interactive grid for placing and attacking ships
- Randomized ship placement for the computer
- Visual feedback for hits and misses
- Responsive design
- Pass turn screen

## Key Aspects and Experiments

- Test-driven Development
- Composition
- Pipelines
- Functional Programming
- Asynchronous Code
- Promises

## Challenges and Solutions

- **Challenge**: Implementing asynchronous, sequential ship placement.
  **Solution**: Utilized Promises and async/await to handle it.

- **Challenge**: Ensuring responsive design.
  **Solution**: Used CSS Grid and Flexbox to create a flexible and adaptive layout.

## Future Improvements

- Enhancement of PC moves (create memory of successful shots and shape the next guess based on this).
- Improve the user interface with animations and better icons.

## Stack Used

- Vanilla JS
- Jest
- Webpack
- Babel

## Testing

Jest was used to write unit tests for the core game logic - covering the Ship, Player and Gameboard factories.

---

Thanks for reading!
