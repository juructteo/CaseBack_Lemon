const { validacao } = require('./validacao')
const { teste1, teste2 } = require('./entrada')
const { input } = require('./schemas')



const checkConsume = (inputGeral) => {
    const consumoElegivel = ['comercial', 'residencial', 'industrial']
    const convert = inputGeral.classeDeConsumo
    if (consumoElegivel.includes(convert)) {
        return true
    } else return "Classe de consumo não aceita"
}

const checkTarifa = (inputGeral) => {
    const tarifaElegivel = ['convencional', 'branca']
    const convert = inputGeral.modalidadeTarifaria.toLowerCase()
    if (tarifaElegivel.includes(convert)) {
        return true
    } else return "Modalidade tarifária não aceita"
}

const checkMedia = (inputGeral) => {
    const meses = inputGeral.historicoDeConsumo.length;
    const sumMonths = inputGeral.historicoDeConsumo.reduce(
        (acumulador, valorAtual) => acumulador + valorAtual, 0);
    const mediaFinal = sumMonths / meses

    const economiaCO2 = (84 * mediaFinal * 12) / 1000

    if (mediaFinal > 400 && inputGeral.tipoDeConexao === 'monofasico') {
        return economiaCO2
    } else if (mediaFinal > 500 && inputGeral.tipoDeConexao === 'bifasico') {
        return economiaCO2
    } else if (mediaFinal > 750 && inputGeral.tipoDeConexao === 'trifasico') {
        return economiaCO2
    } else return false
}


const elegibilidade = (inputGeral) => {
    if (!validacao(input, inputGeral)) return false
    if (checkConsume(inputGeral) === true
        && checkTarifa(inputGeral) === true
        && checkMedia(inputGeral) !== false) {

        const resposta = {
            "elegivel": true,
            "economiaAnualDeCO2": checkMedia(inputGeral),
        }
        return resposta
    } else {
        const resposta = {
            "elegivel": false,
            "razoesInelegibilidade": [
                checkConsume(inputGeral),
                checkTarifa(inputGeral)
            ]
        }
        return resposta
    }
}

console.log(elegibilidade(teste2))

module.exports = { checkConsume, checkTarifa, checkMedia, elegibilidade }