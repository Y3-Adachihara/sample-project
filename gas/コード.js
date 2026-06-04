const getA1 = (e) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const value = sheet.getRange('AI1').getValue();
  return value;
}
const doGet = (e) => {
  let response;
  // e の中の mode で実行する関数を切り替える
  // e を投げてその後の処理は関数に任せる
  // 現時点では参照しない
  response = getA1(e);
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ response }));
  return output;
}