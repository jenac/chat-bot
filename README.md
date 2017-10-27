# Chat-bot

## Development Commands

Use npm, see package.json

ACTION | COMMAND
--- | ---
build | `babel src -d build` 
run | `node build\index.js` 
test | `mocha --compilers js:babel-core/register ./src/**/*.spec.js`

## Configuration

Set Environment Variable BOT_CONFIG_FILE, point to a configuration json file like the following:

```javascript
{
    "mongoServer": "localhost",
    "lkgFile": "./data/lkg.json",
    "listen": 6688,
    "dataFolder": "./data"
}
```

## Setup Mongo

Set Environment Variables for:
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD
- MONGO_INITDB_DATABASE

## Run single spec
`mocha --compilers js:babel-core/register ./src/**/somefile.spec.js`