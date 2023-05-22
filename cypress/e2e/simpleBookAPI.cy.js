import faker from 'faker';

describe('Simple Books API', () => {
    let bookId = 1;
    let accessToken = null;

    it('Returns the status of the API', () => {
        cy.api({
            method: 'GET',
            url: '/status'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'OK');
        });
    });

    it('Returns a list of books', () => {
        cy.api({
            method: 'GET',
            url: '/books'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.length(6);
        });
    });

    it('Returns a list of books with type non-fiction', () => {
        cy.api({
            method: 'GET',
            url: '/books',
        }).then((response) => {
            expect(response.status).to.equal(200);
            return response.body.filter((element) => element.type === 'non-fiction');
        }).then((response) => {
            expect(response).to.have.length(2);
        });
    });

    it('Returns a list of books with limit 4', () => {
        cy.api({
            method: 'GET',
            url: '/books',
        }).then((response) => {
            expect(response.status).to.equal(200);
            // Extract the first 4 elements
            return response.body.slice(0, 4);
        }).then((response) => {
            expect(response).to.have.length(4);
        });
    });

    it('Get a single book with a bookId=2', () => {
        cy.api({
            method: 'GET',
            url: '/books/2',
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object'); // Assert that the body is an object
            expect(Object.keys(response.body)).to.have.length(7);
            expect(response.body).to.have.property("name", "Just as I Am");
        });
    });

    it('API Authentication', () => {

        const name = faker.name.firstName();
        const email = faker.internet.email();

        cy.api({
            method: 'POST',
            url: '/api-clients/',
            headers: {
                ContentType: "application/json",
            },
            body: {
                "clientName": name,
                "clientEmail": email
            },
        }).then((response) => {
            let responseJSON = JSON.stringify(response.body);
            expect(response.status).to.equal(201);
            expect(response.body).to.be.an('object'); // Assert that the body is an object
            cy.writeFile("cypress/fixtures/response.json", responseJSON, "utf8");
        });
    });

    it('Submit an order', () => {

        const name = faker.name.firstName();
        cy.fixture("response.json").then((fileContent) => {
            accessToken = fileContent.accessToken;
        }).then(() => {

            cy.api({
                method: 'POST',
                url: '/orders',
                headers: {
                    ContentType: "application/json",
                    Authorization: "Bearer "+accessToken
                },
                body: {
                    "bookId": bookId,
                    "customerName": name
                }
            }).then((response) => {
                expect(response.status).to.equal(201);
                expect(response.body).to.be.an('object'); // Assert that the body is an object
                expect(response.body).to.have.property("created", true);
            });
        });
    });

    it('Get all orders', () => {

        cy.fixture("response.json").then((fileContent) => {
            accessToken = fileContent.accessToken;
        }).then(() => {

            cy.api({
                method: 'GET',
                url: '/orders',
                headers: {
                    ContentType: "application/json",
                    Authorization: "Bearer "+accessToken
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.length(1); // Assert that the body is an object
                const object = response.body.find((obj) => obj.bookId === bookId);
                expect(object).to.have.property("createdBy");
            });
        });
    });

    it('Get an order', () => {

        cy.fixture("response.json").then((fileContent) => {
            accessToken = fileContent.accessToken;
        }).then(() => {

            cy.api({
                method: 'GET',
                url: '/orders',
                headers: {
                    ContentType: "application/json",
                    Authorization: "Bearer "+accessToken
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.length(1); // Assert that the body is an object
                const object = response.body.find((obj) => obj.bookId === bookId);
                expect(object).to.have.property("createdBy");
            });
        });
    });
});