// Tells the Viewers to say !hello to the lonely bot
const sayHelloToPolyBot = setInterval(() => {
    return client.action('epistemicpolymath', 'Say Hello to polymathicalbot with: !hello');
}, 600000);

module.exports = sayHelloToPolyBot;
