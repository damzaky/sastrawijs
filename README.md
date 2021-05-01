# SastrawiJs

[![Node version](https://img.shields.io/node/v/sastrawijs.svg?style=flat)](http://nodejs.org/download/) [![Build Status](https://travis-ci.org/damzaky/sastrawijs.svg?branch=master)](https://travis-ci.org/damzaky/sastrawijs)

SastrawiJs is a javascript package for doing stemming in Indonesian language. It is based from [Sastrawi](https://github.com/sastrawi/sastrawi) for PHP by [Andy Librian](https://github.com/andylibrian). For more information in english, see [README](#).

SastrawiJs adalah package javascript untuk melakukan _stemming_ pada bahasa Indonesia. Dikembangkan dari [Sastrawi](https://github.com/sastrawi/sastrawi) untuk PHP yang dibuat oleh [Andy Librian](https://github.com/andylibrian).

## Stemming

Dari [Wikipedia](https://en.wikipedia.org/wiki/Stemming), _stemming_ adalah proses untuk mengubah kata berimbuhan menjadi kata dasar. Contohnya :

- menahan => tahan
- pewarna => warna

## Instalasi

Untuk browser/client javascript

```html
<script src="stemmer.js"></script>
<script src="tokenizer.js"></script>
```

Untuk node.js

```
npm install sastrawijs
```

Lalu di dalam file

```javascript
var sastrawi = require("sastrawijs");
```

## Contoh Penggunaan

Web/client

```javascript
var sentence =
  "Perekonomian Indonesia sedang dalam pertumbuhan yang membanggakan";
var stemmed = [];
var stemmer = new Stemmer();
var tokenizer = new Tokenizer();
words = tokenizer.tokenize(sentence);
for (word of words) {
  stemmed.push(stemmer.stem(word));
}
console.log(stemmed);
```

Node

```javascript
var sentence =
  "Perekonomian Indonesia sedang dalam pertumbuhan yang membanggakan";
var stemmed = [];
var stemmer = new sastrawi.Stemmer();
var tokenizer = new sastrawi.Tokenizer();
words = tokenizer.tokenize(sentence);
for (word of words) {
  stemmed.push(stemmer.stem(word));
}
console.log(stemmed);
```

Selain menggunakan kamus kata dasar default, user juga dapat membuat kamus kata dasar sendiri.

<!-- prettier-ignore -->
```javascript
var custom = ["hancur", "benar", "apa", "siapa", "jubah",
    "baju", "beli", "celana", "hantu", "jual", "buku", "milik", "kulit",
    "sakit", "kasih", "buang", "suap", "nilai", "beri", "rambut", "adu",
    "suara", "daerah", "ajar", "kerja", "ternak", "asing", "raup", "gerak",
    "puruk", "terbang", "lipat", "ringkas", "warna", "yakin", "bangun",
    "fitnah", "vonis", "baru", "ajar", "tangkap", "kupas", "minum", "pukul",
    "cinta", "dua", "jauh", "ziarah", "nuklir", "gila", "hajar", "qasar",
    "udara", "populer", "warna", "yoga", "adil", "rumah", "muka", "labuh",
    "tarung", "tebar", "indah", "daya", "untung", "sepuluh", "ekonomi",
    "makmur", "telah", "serta", "percaya", "pengaruh", "kritik", "seko",
    "sekolah", "tahan", "capa", "capai", "mula", "mulai", "petan", "tani",
    "aba", "abai", "balas", "balik", "peran", "medan", "syukur", "syarat",
    "bom", "promosi", "proteksi", "prediksi", "kaji", "sembunyi", "langgan",
    "laku", "baik", "terang", "iman", "bisik", "taat", "puas", "makan",
    "nyala", "nyanyi", "nyata", "nyawa", "rata", "lembut", "ligas",
    "budaya", "karya", "ideal", "final", "taat", "tiru", "sepak", "kuasa",
    "malaikat", "nikmat", "lewat", "nganga", "allah"];
var stemmer = new Stemmer(custom);
```

## Pustaka

#### Algoritma

1. Algoritma Nazief dan Adriani
2. Asian J. 2007. **_Effective Techniques for Indonesian Text Retrieval_**. PhD thesis School of Computer Science and Information Technology RMIT University Australia. ([PDF](http://researchbank.rmit.edu.au/eserv/rmit:6312/Asian.pdf) dan [Amazon](https://www.amazon.com/Effective-Techniques-Indonesian-Text-Retrieval/dp/3639021649))
3. Arifin, A.Z., I.P.A.K. Mahendra dan H.T. Ciptaningtyas. 2009. **_Enhanced Confix Stripping Stemmer and Ants Algorithm for Classifying News Document in Indonesian Language_**, Proceeding of International Conference on Information & Communication Technology and Systems (ICTS). ([PDF](http://personal.its.ac.id/files/pub/2623-agusza-baru%2021%20d%20VIP%20enhanced-confix-stripping-stem.pdf))
4. A. D. Tahitoe, D. Purwitasari. 2010. **_Implementasi Modifikasi Enhanced Confix Stripping Stemmer Untuk Bahasa Indonesia dengan Metode Corpus Based Stemming_**, Institut Teknologi Sepuluh Nopember (ITS) – Surabaya, 60111, Indonesia. ([PDF](http://digilib.its.ac.id/public/ITS-Undergraduate-14255-paperpdf.pdf))
5. Tambahan aturan _stemming_ dari [kontributor Sastrawi](https://github.com/sastrawi/sastrawi/graphs/contributors).

#### Kamus Kata Dasar

Proses stemming oleh Sastrawi sangat bergantung pada kamus kata dasar. Sastrawi menggunakan kamus kata dasar dari [kateglo.com](http://kateglo.com) dengan sedikit perubahan.

## Lisensi

Sebagaimana [Sastrawi](https://github.com/sastrawi/sastrawi) untuk PHP, SastrawiJs juga disebarkan dengan lisensi [MIT](http://choosealicense.com/licenses/mit/). Untuk lisensi kamus kata dasar dari Kateglo adalah [CC-BY-NC-SA 3.0](https://github.com/ivanlanin/kateglo#lisensi-isi).

## Di Bahasa Pemrograman Lain

- [Sastrawi](https://github.com/sastrawi/sastrawi) - PHP
- [JSastrawi](https://github.com/jsastrawi/jsastrawi) - Java
- [cSastrawi](https://github.com/mohangk/c_sastrawi) - C
- [PySastrawi](https://github.com/har07/PySastrawi) - Python
- [Go-Sastrawi](https://github.com/RadhiFadlillah/go-sastrawi) - Go
- [Sastrawi-Ruby](https://github.com/meisyal/sastrawi-ruby) - Ruby
