const { validacao } = require('./validacao')
const { input } = require('./schemas')
const { elegibilidade } = require('./elegibilidade')



describe('Validacao dos dados de input e output', () => {
    test('Deve ser true quando a entrada do usuario atender ao input', () => {
        expect(validacao(input, teste1)).toBe(true);
    });

    test('Deve ser false quando a entrada do usuario não atender ao input', () => {
        const inputErrada = { "historicoDeConsumo": "poderPublico" }
        expect(validacao(input, inputErrada)).toBe(false);
    });
    test('Deve ser true quando a saida do usuario atender ao output', () => {
        expect(validacao(output, elegibilidade(teste1))).toBe(true);
    });
    test('Deve ser false quando a saida do usuario não atender ao input', () => {
        const inputErrada = { "historicoDeConsumo": "poderPublico" }
        expect(validacao(output, elegibilidade(inputErrada))).toBe(false);
    });

})