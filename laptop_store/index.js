const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');

const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  const id = url.parse(req.url, true).query.id;
  if (pathName === '/laptop' && id < laptopData.length) {
    res.writeHead(200, { 'Content-type': 'text/html' });

    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      'utf-8',
      (err, data) => {
        const laptop = laptopData[id];
        const output = replaceTemplate(data, laptop);
        res.end(output);
      },
    );
  } else if (pathName === '/products' || pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    fs.readFile(
      `${__dirname}/templates/template-overview.html`,
      'utf-8',
      (err, data) => {
        let overviewOutput = data;
        fs.readFile(
          `${__dirname}/templates/template-card.html`,
          'utf-8',
          (err, data) => {
            const cardsOutput = laptopData
              .map(el => replaceTemplate(data, el))
              .join('');
            overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
            res.end(overviewOutput);
          },
        );
      },
    );
  } else if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
      res.writeHead(200, { 'Content-type': 'image/jpg' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('Thre is no page like this');
  }
});

server.listen(1338, '127.0.0.1', () => {
  console.log('Listening for requests now');
});

replaceTemplate = (currentLaptop, laptop) => {
  let output = currentLaptop.replace(/{%productName%}/g, laptop.productName);
  output = output.replace(/{%image%}/g, laptop.image);
  output = output.replace(/{%cpu%}/g, laptop.cpu);
  output = output.replace(/{%ram%}/g, laptop.ram);
  output = output.replace(/{%storage%}/g, laptop.storage);
  output = output.replace(/{%screen%}/g, laptop.screen);
  output = output.replace(/{%price%}/g, laptop.price);
  output = output.replace(/{%description%}/g, laptop.description);
  output = output.replace(/{%id%}/g, laptop.id);
  return output;
};
