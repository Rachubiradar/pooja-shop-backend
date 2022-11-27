
function check()
{
    console.log('function calling');
}
setInterval(() => {
    check()
}, 1000*5);

module.exports = {check};