const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'photo_gallery',
});

const getImages = (id, cb) => {
  connection.query(`select i.img_path from images i inner join product_images pi where i.id = pi.image_id and pi.product_id = ${id}`, (err, result) => {
    if (err) console.log(err);
    cb(result);
  });
};

const getProductInfo = (id, cb) => {
  console.log(id);
  connection.query(`select name, detail from products where id = ${id}`, (err, result) => {
    if (err) console.log(err);
    cb(result);
  });
};

const createProduct = (name, detail, img_path, pi, ii, cb) => {
  connection.query(`insert into products (name, detail) values('${name}', '${detail}')`, (err, result) => {
    if (err) console.log(err);
    connection.query(`insert into images (img_path) values(${img_path});`, (err, result) => {
      if (err) console.log(err);
      connection.query(`insert into product_images (product_id, image_id) values(${pi}, ${ii});`, (err, result) => {
        if (err) console.log(err);
        cb(result);
      });
    });
  });
};

const updateProduct = (name, detail, id, pi, ii, cb) => {
  connection.query(`update products set name = '${name}', detail = '${detail}' where id = ${id};`, (err, result) => {
    if (err) console.log(err);
    connection.query(`update product_images set image_id = ${ii} where product_id = ${pi};`, (err, result) => {
      if (err) console.log(err);
      cb(result);
    });
  });
};

const deleteProduct = (id, cb) => {
  connection.query(`delete products, product_images from products inner join product_images where products.id = ${id} and product_id = ${id}`, (err, result) => {
    if (err) console.log(err);
    cb(result);
  });
};

module.exports = {
  getImages,
  getProductInfo,
  createProduct,
  updateProduct,
  deleteProduct,
};
