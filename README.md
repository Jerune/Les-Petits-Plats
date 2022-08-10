![HTML](https://forthebadge.com/images/badges/uses-html.svg)
![Javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)
![tool-sass](https://user-images.githubusercontent.com/76209231/169813018-fb083b76-0ea4-4a9c-816a-19786ccdd023.svg)

![logo](https://github.com/Jerune/Les-Petits-Plats/blob/master/assets/logo.png)

# Les Petits Plats

Les Petit Plats is a recipe platform that allow users to filter available recipes according to a general keyword search as well as specific advanced search by letting the user select and remove ingredient, machine or utensils filters.
# Project information

## Prerequisites

* [NodeJS (version 12.18)](https://nodejs.org/en/) to run npm command
## Launching the project

1. Clone the Github repo

    `git clone https://github.com/Jerune/Les-Petits-Plats`

2. Install the dependencies by running the command 

    `npm i` (or `npm install`)

3. Launch the App using the Live Server extension 

Runs the app in the development mode.\
Open [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html) to view the app in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Frameworks & Libraries

This project uses the Bootstrap 5 CSS framework and a few scripts and libraries to be able to function correctly:
### Bootstrap 5
Bootstrap 5 is used to build the styles of this website. 95% of the styles are the native Bootstrap styles. All icons are rendered from the native Bootstrap icons library.
### Sass
All styles are compiled using Sass (as this is the Bootstrap standard). Besides the Bootstrap styles about 5% of the project uses custom styles represented by a .scss file in the components folder as well as some variable overrides and general styles in the styles folder. 
### ESLint & Prettier
The project uses a combination of ESLint & Prettier in the eslint-plugin-prettier extention for cleaner code.
### JSDoc
The project uses JSDoc in combination with the DocDash library to provide technical documentation on all function in the project.

Please see the package.json file for specs on the framework and library versions.