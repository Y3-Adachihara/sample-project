const getA1 = (e) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const value = sheet.getRange('AI1').getValue();
  return value;
}

/**
 * 掲示板用スプレッドシートのシートオブジェクトを取得（存在しない場合は作成）する
 */
function getKeijibanSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("掲示板");
  if (!sheet) {
    sheet = ss.insertSheet("掲示板");
    sheet.appendRow(["名前", "投稿内容", "投稿日時"]);
  }
  return sheet;
}

/**
 * JSONレスポンスを作成するヘルパー
 */
function createJsonResponse(data) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(data));
  return output;
}

/**
 * 一覧取得関数
 */
function getList(e) {
  const sheet = getKeijibanSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return createJsonResponse({ status: "success", posts: [] });
  }
  
  const values = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  const posts = values.map(row => {
    return {
      name: row[0],
      message: row[1],
      timestamp: row[2]
    };
  });
  
  return createJsonResponse({ status: "success", posts: posts });
}

/**
 * 投稿関数
 */
function postMessage(e) {
  const name = e.parameter.name || "名無しさん";
  const message = e.parameter.message || "";
  
  if (!message) {
    return createJsonResponse({ status: "error", message: "投稿内容を入力してください。" });
  }
  
  const timestamp = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
  
  const sheet = getKeijibanSheet();
  sheet.appendRow([name, message, timestamp]);
  
  return createJsonResponse({ status: "success", post: { name, message, timestamp } });
}

function doGet(e) {
  let response;

  if (e && e.parameter && e.parameter.mode === 'list') {
    response = getList(e);
  } else if (e && e.parameter && e.parameter.mode === 'post') {
    response = postMessage(e);
  } else {
    const value = getA1(e);
    response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    response.setContent(JSON.stringify({ response: value }));
  }

  return response;
}