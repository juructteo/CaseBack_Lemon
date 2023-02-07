const { checkConsume, checkTarifa, checkMedia, elegibilidade } = require('./elegibilidade');
const { teste1, teste2 } = require('./entrada')

describe('Teste se o consumo do usuario está de acordo com os criterios', () => {
    test('Deve ser elegivel quando a tarifa do usuario for condizente a required', () => {
        expect(checkConsume(teste1)).toBe(true);
    });

    test('Não deve ser elegivel quando a tarifa do usuario for diferente da required', () => {
        const history = { "historicoDeConsumo": "poderPublico" }
        expect(checkConsume(history)).toBe("Classe de consumo não aceita");
    });

})

describe('Teste se a modalidade tarifaria do usuario está de acordo com os criterios', () => {
    test('Deve ser elegivel quando a tarifa do usuario for condizente a required', () => {
        expect(checkTarifa(teste1)).toBe(true);
    });

    test('Não deve ser elegivel quando a tarifa do usuario for diferente da required', () => {
        expect(checkTarifa(teste2)).toBe("Modalidade tarifária não aceita");
    });

})

describe('Teste do consumo minimo do usuario está de acordo com os criterios', () => {
    test('Deve ser elegivel quando o consumo do usuario for condizente a required', () => {
        expect(checkMedia(teste1)).toBe(5553.24);
    });
    test('Deve ser elegivel quando o consumo do usuario for condizente a required', () => {
        const monoMaior = {
            "tipoDeConexao": "monofasico",
            "historicoDeConsumo": [
                3878, // mes atual
                9760, // mes anterior
                5976, // 2 meses atras
                2797, // 3 meses atras
                2481, // 4 meses atras
                5731, // 5 meses atras
                7538, // 6 meses atras
                4392, // 7 meses atras
                7859, // 8 meses atras
                4160, // 9 meses atras
                6941, // 10 meses atras
                4597  // 11 meses atras

            ]
        }
        expect(checkMedia(monoMaior)).toBe(5553.24);
    });
    test('Deve ser elegivel quando o consumo do usuario for condizente a required', () => {
        const triMaior = {
            "tipoDeConexao": "trifasico",
            "historicoDeConsumo": [
                3878, // mes atual
                9760, // mes anterior
                5976, // 2 meses atras
                2797, // 3 meses atras
                2481, // 4 meses atras
                5731, // 5 meses atras
                7538, // 6 meses atras
                4392, // 7 meses atras
                7859, // 8 meses atras
                4160, // 9 meses atras
                6941, // 10 meses atras
                4597  // 11 meses atras

            ]
        }
        expect(checkMedia(triMaior)).toBe(5553.24);
    });

    test('Não deve ser elegivel quando o consumo do usuario for diferente da required', () => {
        const monoMenor = {
            "tipoDeConexao": "monofasico",
            "historicoDeConsumo": [
                400, // mes atual
                400, // mes anterior
                400, // 2 meses atras
                400, // 3 meses atras

            ]
        }
        expect(checkMedia(monoMenor)).toBe(false);

    });
    test('Não deve ser elegivel quando o consumo do usuario for diferente da required', () => {
        const biMenor = {
            "tipoDeConexao": "bifasico",
            "historicoDeConsumo": [
                500, // mes atual
                500, // mes anterior
                500, // 2 meses atras
                500, // 3 meses atras
            ]
        }
        expect(checkMedia(biMenor)).toBe(false);

    });
    test('Não deve ser elegivel quando o consumo do usuario for diferente da required', () => {
        const triMenor = {
            "tipoDeConexao": "trifasico",
            "historicoDeConsumo": [
                750,// mes atual
                750,// mes anterior
                750,// 2 meses atras
                750// 3 meses atras



            ]
        }
        expect(checkMedia(triMenor)).toBe(false);

    });



})

describe('Elegibilidade do usuario está de acordo com os criterios', () => {

    test('Deve ser false quando a entrada do usuario for diferente do schema', () => {
        const entradaErrada = "Exemplo de entrada errada do usuario"
        expect(elegibilidade(entradaErrada)).toBeFalsy()
    })
    test('Deve ser elegivel quando input do usuario for condizente a required', () => {
        const respostacerta = {
            "elegivel": true,
            "economiaAnualDeCO2": 5553.24,
        }
        expect(elegibilidade(teste1)).toStrictEqual(respostacerta);
    });

    test('Não deve ser elegivel o input usuario que for diferente da required', () => {
        const respostaerrada = {
            "elegivel": false,
            "razoesInelegibilidade": [
                "Classe de consumo não aceita",
                "Modalidade tarifária não aceita"
            ]
        }
        expect(elegibilidade(teste2)).toStrictEqual(respostaerrada);
    });

}) 
