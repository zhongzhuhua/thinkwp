import Reg from 'commons/reg.js';

class Index {
  constructor() {
    console.log(Reg);
    new Promise((res) => {
      console.log('index');
      setTimeout(() => {
        res();
      }, 3000);
    }).then(() => {
      console.log('index end');
    });
  };
};

new Index();
