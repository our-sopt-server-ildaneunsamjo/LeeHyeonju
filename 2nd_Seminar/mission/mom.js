let isMomHappy = true;
let phone = {
    brand: 'Samsung',
    color: 'black'
};

var willIGetNewPhone = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (isMomHappy){
            resolve(console.log(phone));
        } else{
            var reason = new Error('mom is not happy');
            reject(reason);
        }
    }, 0);
});
