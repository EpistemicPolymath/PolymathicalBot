const helpImproveStream = setTimeout(() => { setInterval(() => {
    client.action('epistemicpolymath', 'Help improve the stream!: !comments ');
}, 1200000);
}, 120000);

module.exports = helpImproveStream;
