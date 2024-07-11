var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
const data = require('./deyimler.json');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
   
    fs.readFile('deyimler.json', 'utf8', (err, deyimler) => {
        if (err) {
            console.error('JSON dosyası okunamadı:', err);
            return res.status(500).send('Sunucu hatası');
        }
        let data;
        try {
            data = JSON.parse(deyimler);
        } catch (parseError) {
            console.error('JSON verisi çözülemedi:', parseError);
            return res.status(500).send('Sunucu hatası');
        }

        
        if (!data || !Array.isArray(data)) {
            return res.status(500).send('Geçersiz veri yapısı');
        }

        
        res.render('main', { data: data ,query: ''});
    });
});

app.get('/iletisim/', (req, res) => {
    res.render('iletisim');
});
// search
app.get('/arama', (req, res) => {
    const query = req.query.query ? req.query.query : '';
    console.log(req.query.query);
    const filtrelenmis = data.filter(oge => 
        oge.deyim_adi.includes(query)
    );
    res.render('main', { data: filtrelenmis , query: req.query.query });
});
app.get("/:universalURL", (req, res) => { 
    res.send("404 URL NOT FOUND"); 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});