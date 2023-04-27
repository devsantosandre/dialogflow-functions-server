const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

const { RESPONSES_SHEET_ID } = process.env;
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const getDataParamsResponse = async (intentName, data) => {
  await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });

  await doc.loadInfo();

  let sheet = doc.sheetsByIndex[0];

  let response = "";
  let params = {};

  switch (intentName) {
    case "avaliacao.adulto":
      params = {
        "Nome do paciente": data.nome_paciente.name,
        "Telefone": data.telefone,
        "Especialidade": "Avaliação",
      };
      break;
    case "avaliacao.crianca":
      params = {
        "Nome do paciente":
          data.nome_crianca.name + " ( " + data.nome_responsavel.name + " )",
        "Telefone": data.telefone_responsavel,
        "Especialidade": "Avaliação Odontopediatria",
      };
      break;
    default:
        params = {};
      break;
  }

  await sheet.addRow(params);

  if (response === "") {
    response += "We are unavailable at this time. Try after sometimes.";
  }

  return response;
};

module.exports = {
  getDataParamsResponse,
};
