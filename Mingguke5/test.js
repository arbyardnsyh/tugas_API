// 
const express = require('express');
const app = express()

app.get('/', (req, res) =>
     {
    const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    fetch (url)
        .then(response =>response.json ())
        .then(data => {
            res.send(`
                 <h1>Bitcoin Rate : </h1>
                <p>USD : ${data.bpi.USD.rate}</p>
                <p>EUR : ${data.bpi.EUR.rate}</p>
                <p>GBP : ${data.bpi.GBP.rate}</p>
                
                `);
            // console.log('BITCOIN PRICE Index :');
            // console.log(USD : ${data.bpi.USD.rate});
            // console.log(EUR : ${data.bpi.EUR.rate});
        })
        .catch(error => {
            console.log('Error Data tidak ditemukan', error);
            });

});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

// fetch (url)
//     .then(response =>response.json ())
//     .then(data => {
//         console.log('BITCOIN PRICE Index :');
//         console.log(USD : ${data.bpi.USD.rate});
//         console.log(EUR : ${data.bpi.EUR.rate});
//     })
//     .catch(error => {
//         console.log('Error Data tidak ditemukan', error);
//         });