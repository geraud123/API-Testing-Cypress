describe('Simple Books API', () => {
    it('Returns the status of the API', () => {
        cy.api({
            method: 'GET',
            url: '/status'
        }).then((response: any) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'OK');
        });
    });

    it('Returns a list of books', () => {
        cy.api({
            method: 'GET',
            url: '/books'
        }).then((response: any) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', '1');
        });
    });
});