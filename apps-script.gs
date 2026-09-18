/**
 * Planilha de bilhetes do bolão.
 *
 * Como publicar (5 min):
 * 1. Crie uma planilha nova no Google Sheets.
 * 2. Extensões → Apps Script. Apague o que tiver e cole este arquivo inteiro.
 * 3. Implantar → Nova implantação → tipo "App da Web".
 *    Executar como: você. Quem pode acessar: Qualquer pessoa.
 * 4. Copie a URL que termina em /exec e cole em planilhaUrl no app/config.js.
 *
 * Cada bilhete gerado vira uma linha na aba "bilhetes".
 * Cada clique em "Registrar no WhatsApp" marca a coluna "clicou_whatsapp" da mesma linha.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName("bilhetes") || ss.insertSheet("bilhetes");
    var palpites = d.palpites || [];

    if (sh.getLastRow() === 0) {
      var cab = ["data", "rodada", "codigo", "clicou_whatsapp"];
      palpites.forEach(function (p, i) { cab.push((i + 1) + ". " + p.jogo + " — " + p.mercado); });
      sh.appendRow(cab);
      sh.setFrozenRows(1);
    }

    if (d.tipo === "whatsapp") {
      var codigos = sh.getRange(1, 3, sh.getLastRow(), 1).getValues();
      for (var r = codigos.length - 1; r >= 1; r--) {
        if (codigos[r][0] === d.codigo) { sh.getRange(r + 1, 4).setValue("sim"); break; }
      }
    } else {
      var linha = [new Date(), d.rodada || "", d.codigo || "", ""];
      palpites.forEach(function (p) { linha.push(p.escolha); });
      sh.appendRow(linha);
    }
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("bolao ok");
}
