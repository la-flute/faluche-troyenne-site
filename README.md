# faluche-troyenne-site
UI du site de présentation et de gestion des événements de l'association La Flute

## Requirements

* [Node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

## Installation

```
git clone https://github.com/la-flute/faluche-troyenne-site.git
# or
git clone git@github.com:la-flute/faluche-troyenne-site.git

cd faluche-troyenne-site
yarn
```

## Configuration

```
# copy env file for all environments
cp .env .env.local
# makes your changes in .env.local, which will not be pushed
nano .env.local
# you should change DB settings for your database
```

## Commands

```
yarn dev    # development server
yarn start  # production server
```
