
const Ajv = require("ajv")
const ajv = new Ajv({ strict: false })

function validacao(schema, entradaSaida) {
    const validateInput = ajv.compile(schema)

    const valid = validateInput(entradaSaida)

    if (!valid) {
        return false
    } else return true
}

module.exports = { validacao }