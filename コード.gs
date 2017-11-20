function postmain(){
    var ws 　=　SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var ss　=　ws.getName();
    var objCell = ws.getActiveCell();
    var modify = objCell.getValue();
    var qacolm = objCell.getColumn();
    if (qacolm == 4){
      var qa = "質問";
      var s = objCell.getValue();
    }else{
      var qa ="回答";
      var s = objCell.getValue();
    }

    if ( s =="" ) {
      Browser.msgBox("この記入したセルをアクティブセルにしてください",Browser.Buttons.OK);
     　return;
    }

    var yourSelections = Browser.msgBox("この"+qa+"でよいですか?  \\n"+s,Browser.Buttons.OK_CANCEL);
  // キャンセルボタンをクリックした場合は"cancel"
 // var modify = Browser.inputBox('質問か回答かを教えてください','OKしたらつぶやくので文面をよくみてくださいね', Browser.Buttons.OK); 
    if (yourSelections != 'cancel'){
      nm=Session.getActiveUser().getEmail().match(/(.*)@/)[1];

      Logger.log(modify);
      modify = "@all 各位" + nm+"さんからの "+　qa　+"です　　　 "+ s +"　質問表　　→　"
      postTypeTalk(　modify,qa)
  }
}

function postTypeTalk(postword,qa){
//  var apikey_a="XX";  // A君 
//  var apikey_q="xx";  // Q君　発行されたトークンを設定
  var topicid="53268";　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//トピックのID

  if (qa == "質問"){
    apikey = apikey_q;
  }else{
    apikey = apikey_a;
  }
  
  var apiurl = "https://typetalk.in/api/v1/topics/"+topicid+"?typetalkToken="+apikey;
// POSTオプション
  var options = {
    "muteHttpExceptions":true,
    "method" : "POST",
    'payload' : {
        "message" : postword
    }
  }

  Logger.log(options);
  var resissue = UrlFetchApp.fetch(apiurl,options); 
  if (resissue.getResponseCode() != 200) {
    return false;
  }  
  return JSON.parse(resissue.getContentText());
}

//-----------------------------------
// ファイルオープン時にメニューバーにカスタムメニューを追加
//-----------------------------------
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var entries = [{name : "記入したことをつぶやく",functionName : "postmain"}
                ];
  spreadsheet.addMenu("ERCMenu", entries);
}