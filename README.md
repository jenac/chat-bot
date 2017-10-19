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
    "dbUrl": "mongodb://localhost:27017/chat-bot",
    "lkgFile": "C:\\Projects\\chat-bot\\data\\lkg.json",
    "listen": 6688,
    "dataFolder": ".\\data"
}

```