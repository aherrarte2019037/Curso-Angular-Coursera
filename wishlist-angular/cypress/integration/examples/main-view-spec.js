describe('ventana principal', () => {
    it('Tiene encabezado correcto y idioma español por defecto', () => {
        cy.visit('http://localhost:4200');
        cy.contains('Destinos');
        cy.get('nav div div a').should('contain', 'Inicio');
        cy.get('div h1').should('contain', 'Bienvenido');
    });

});