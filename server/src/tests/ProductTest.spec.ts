import app from '../index';
import request from "supertest";
require('dotenv/config');
import {productModel, Product} from '../models/product';




beforeAll(() => {
  const livro = {
    name: 'Revista',
    price: 10.50,
    stock: 30,
  } as Product;

  productModel.insertProduct(livro);
})




describe("Testando a listagem de produtos", () => {
  test("It should response the GET method", async(done) => {
    const livro = {
      name: 'Revista',
      price: 10.50,
      stock: 30,
    } as Product;
    await productModel.insertProduct(livro)
    request(app)
      .get("/api/v1/products")
      .then(response => {
        expect(response.body).toContainEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
          })
        )

        expect(response.status).toBe(200);

        done();
      });
  });
});




describe("Testando a visualização de um produto pelo ID", () => {
  test("It should response the GET method", async(done) => {
    const livro = {
      name: 'Revista',
      price: 10.50,
      stock: 30,
    } as Product;
    const data = await productModel.insertProduct(livro)
    request(app)
    .get('/api/v1/products/'+data.id)
    .then(response => {
      expect(response.body.id).toBe(data.id)
      expect(response.body.name).toBe(data.name)
      expect(response.body.price).toBe(data.price)
      expect(response.body.stock).toBe(data.stock)

      done();
    })
  })
});



describe("Testando a insersão de um produto", () => {
  test('', done => {

    const livro = {
      name: 'Revista',
      price: 10.50,
      stock: 30,
    }

    request(app)
      .post('/api/v1/products')
      .send(livro)
      .then((response) => {

        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
          })
        );

        expect(response.status).toBe(200);

        done();
      })
  })
})




describe('Testando a vender', () => {
  test('', async (done) => {
    const livro = {
      name: 'Revista',
      price: 10.50,
      stock: 30,
    } as Product;
    const data = await productModel.insertProduct(livro)
    request(app)
    .put("/api/v1/products/sell/"+ data.id)
    .then((response) => {
      
      expect(response.body.stock).toEqual(data.stock-1);
      done();
    })

  })
});


describe('Testando a remoção do produto', () => {
  test('', async(done) => {
    const livro = {
      name: 'Revista',
      price: 10.50,
      stock: 30,
    } as Product;
    const data = await productModel.insertProduct(livro)
    request(app)
    .delete("/api/v1/products/"+ data.id)
    .then((response) => {
      expect(response.status).toBe(200);
      done();
    }) 
  })
})


describe("Testando update", () => {
  test('', async(done) => {
    const livro = {
      name: 'Revista',
      price: 10.50,
      stock: 30,
    } as Product;
    const data = await productModel.insertProduct(livro)
    const update = {
      id: data.id,
      name: 'update',
      price: 1,
      stock: 1
    } as Product;

    request(app)
    .put("/api/v1/products/"+ data.id)
    .send(update)
    .then((response) => {
      expect(response.body.id).toBe(data.id)
      expect(response.body.name).toBe(update.name)
      expect(response.body.price).toBe(update.price)
      expect(response.body.stock).toBe(update.stock)
      
      done();
    })
  })
})


afterAll(() => {
  productModel.dropDatabase();
})
