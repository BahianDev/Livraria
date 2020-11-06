import app from '../index';
import request from "supertest";

describe("Testando a listagem de produtos", () => {
  test("It should response the GET method", done => {
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
  test("It should response the GET method", () => {
    request(app)
      .get(`/api/v1/products/show/${6}`)
      //.query({ id: 6 })
      .then(response => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
          })
        )
      })

    //.expect('Content-Type', /json/)
  })
});

describe("Testando a insersão de um produto", () => {
  test('', done => {

    const livro = {
      name: 'Revista playboy',
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

/*describe('Testando a visualizaç', () => {
  test('', done => {

  })
});
*/
