
/***笔记类别begin***/
var allNoteTypeMap = {}, //方便查询
curNote;//存放当前进行编辑的note对象
initNoteTypeMap();

function initNoteTypeMap(){
   var noteTypeArray = store.get("noteType");
   if(noteTypeArray != undefined && noteTypeArray != null){
    for(var i=0;i<noteTypeArray.length;i++){
      allNoteTypeMap[noteTypeArray[i].noteType] = noteTypeArray[i];
    }
  }
}

function getNoteTypeObj(noteType){
  return allNoteTypeMap[noteType];
}

//更新localstorage中noteType
function updateNoteType(noteTypeObj){
  var noteTypeArray = store.get("noteType");
  for(var i =0; i<noteTypeArray.length;i++){
    if(noteTypeArray[i].noteType == noteTypeObj.noteType){
      noteTypeArray[i] = noteTypeObj;
      break;
    }
  }
  store.set("noteType",noteTypeArray);
}
/**
 * 列出类别下的所有笔记列表 
 * 根据笔记类别、列出此类别下笔记缩略图
 * @method showNoteList
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/24
 */
 function showNoteList(noteType) {
  var noteTypeObj = getNoteTypeObj(noteType);
  var notes = noteTypeObj.notes;
  $(".note-names").empty();
  for(var i=0;i<notes.length;i++){
    var note = store.get(noteType+" "+notes[i].noteTitle);
    $(".note-names").append('<li class="name-item" id="defaultNote"><a><h2>' + note.noteTitle + '</h2>' +
    '<p>' + note.noteContents + '</p></a></li>');
  }
}

var data = getNoteListByType(),
  test = data.notes[0].noteTitle,
  allNoteList; //所有笔记

// function showNoteList(noteType) {
//   //阻止重复添加默认数据
//   if (document.getElementById('defaultNote')) {
//     return;
//   }
//   //根据默认笔记类别获取笔记数据 
//   //笔记列表追加默认笔记数据
//   $(".note-names").append('<li class="name-item" id="defaultNote"><a onclick="showDetail(' + data.notes[0].noteTitle + ')"><h2>' + data.notes[0].noteTitle + '</h2>' +
//     '<p>' + data.notes[0].noteContents + '</p></a></li>');

// }

/**
 * 设置默认数据 
 * @method getNoteListByType
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/24
 */
function getNoteListByType() {
  //模拟笔记列表数据,从
  var noteList = {
    noteType: 'JavaScript',
    notes: [{
      noteTitle: 'test'
    }]
  };
  //将默认笔记信息添加到所有笔记数组中,以供查看笔记详情
  setAllNotes({
    noteTitle: 'test'
  });
  return noteList;
}

function init(){
  var noteList = {
  noteType: 'JavaScript',
  notes: [{
    noteTitle: 'test'}]
  };
  var array =[];
  array.push(noteList);
  store.set("noteType",array);
}

/**
*初始化显示所有的笔记类别
*/
function showNoteTypes() {
  $(".note-class").empty();
  //遍历allNoteTypeMap显示所有现有笔记分类
   var noteTypeArray = store.get("noteType");
   if(noteTypeArray != undefined && noteTypeArray != null){
    for(var i=0;i<noteTypeArray.length;i++){
      $(".note-class").append('<li class="class-item"><a href="#">'+ noteTypeArray[i].noteType+'</a></li>');
    }
  }
}

/**
 *添加笔记类别
 * @method addNoteClass
 * @for 所属类名
 * @param 
 * @return 
 * author lwz
 * date 2015/07/25
 */
function addNoteType(noteType) {
  var noteTypeArray = store.get("noteType");
  if(noteTypeArray != undefined){
    if(getNoteTypeObj(noteType) != undefined){
      alert("此类别已存在~~");
      return false;
    }
  }else{
    noteTypeArray = [];
  }
  var noteTypeObj = {
      noteType: noteType,
      notes: []
  };
  noteTypeArray.push(noteTypeObj);
  store.set("noteType",noteTypeArray);
  initNoteTypeMap();
  return true;
}

/**
*通过笔记名称获取noteTypeObj
*/

/***笔记类别end***/

/***笔记详情begin***/
/**
 * 显示新增笔记函数 
 * @method showAddNote
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/22
 */
function showAddNote(optionType, noteTitle, noteType) {
  console.log(optionType);
  document.getElementById('showTitle').innerHTML = '新增笔记';
  //打开新增笔记输入区域并默认将焦点落到笔记标题上,且禁用保存按钮
  document.getElementById('addNote').style.display = 'block';
  if (optionType == 'add') { //新增笔记  
    //再次打开新增时清空上一次输入的值
    if ('' !== document.getElementById('noteTitle')) {
      document.getElementById('noteTitle').value = '';
      document.getElementById('notes').value = '';
      document.getElementById('preview').innerHTML = '';
    } else {
      document.getElementById('noteTitle').focus();
      document.getElementById("saveNoteBtn").setAttribute("disabled", true);
    }

  } else { //修改笔记
    curNote = store.get(noteType +" "+noteTitle);
    document.getElementById('showTitle').innerHTML = '修改笔记';
    document.getElementById('saveNoteBtn').innerHTML = '修改';
    //保存修改前的值,以替换修改前的笔记对象
    // var updateDetail = {},
    // oldNotes = document.getElementById('noteTitle').value;
    document.getElementById('noteTitle').value = noteTitle;
    document.getElementById('notes').value = curNote.noteContents;
    document.getElementById('noteTitle').focus();
    editor.update();  
       // for (var i = 0, arr = getAllNotes(); i < arr.length; i++) {
   //    if (String(oldNotes) === arr[i].noteTitle) {
   //      console.log(allNoteList);
   //      // allNoteList.remove(i);  //此处未后台,为了不产生重复笔记数据,所以先删除原来的值.  
   //      //对修改后的笔记重新set进笔记数组中
   //      updateDetail = {
   //        updateTime: getCurrentTime(), //当前修改时间
   //        author: 'lwz',
   //        noteType: 'noteType',
   //        noteTitle: document.getElementById('noteTitle').value,
   //        noteContents: document.getElementById('notes').value
   //      };
   //      setAllNotes(updateDetail);
   //      break;
   //    }
   //  }
  }
}

/**
 * 保存笔记
 * @method saveNote
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/23
 */
function saveNote(noteType, optionType ,$li) {
  //debugger
  //保存前再次跟踪title、detail字段是否为空
  if ('' === document.getElementById('noteTitle').value || '' === document.getElementById('notes').value) {
    document.getElementById("saveNoteBtn").setAttribute("disabled", true);
  } else {
    document.getElementById("saveNoteBtn").removeAttribute('disabled');
   
    setAllNotes(detailNote); //将当前新笔记对象添加到所有笔记数组中
    document.getElementById('addNote').style.display = 'none'; //新增完后隐藏新增区域
    if(optionType == "add"){
      var detailNote = {
        createTime: getCurrentTime(),
        updateTime: getCurrentTime(), //新增时最后修改时间为新建时间
        author: 'mozzie',
        noteType: noteType,
        noteTitle: document.getElementById('noteTitle').value,
        noteContents: document.getElementById('notes').value
      }; //新增的笔记对象
      if(store.get(detailNote.noteType + " " + detailNote.noteTitle)){
        alert("当前分类下此笔记名称已存在~~~");
      }else{
        //在noteType数据结构中维护note和noteType之间的联系
        if(getNoteTypeObj(noteType) == undefined){
          addNoteType(noteType);
          $(".note-class").append('<li class="class-item"><a href="#">'+ noteType+'</a></li>');
        }
        var noteTypeObj = getNoteTypeObj(noteType);
        noteTypeObj.notes.push({noteTitle : detailNote.noteTitle});
        updateNoteType(noteTypeObj);
        store.set(detailNote.noteType + " " + detailNote.noteTitle, detailNote); //存储笔记，key为noteType和noteTile拼接而成
      }
      $(".note-names").append('<li class="name-item"><a><h2>' + detailNote.noteTitle + '</h2>' +
      '<p>' + detailNote.noteContents + '</p></a></li>');
    }else{//修改
      //在noteType数据结构中维护note和noteType之间的联系
      var noteTypeObj = getNoteTypeObj(noteType);
      for(var i=0;i<noteTypeObj.notes.length;i++){
        if(noteTypeObj.notes[i].noteTitle == curNote.noteTitle){
          noteTypeObj.notes[i].noteTitle = curNote.noteTitle;
          break;
        }
      }
      updateNoteType(noteTypeObj);
      curNote.updateTime = getCurrentTime();
      curNote.noteTitle = document.getElementById('noteTitle').value;
      curNote.noteContents = document.getElementById('notes').value;

      $li.html('<a><h2>' + curNote.noteTitle + '</h2>' +
      '<p>' + curNote.noteContents + '</p></a>');
    }
  }
}

/**
 * title值改变事件
 * @method titleFocus
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/22
 */
function titleFocus() {

  //如当前输入为空则禁止保存按钮,否则开启
  if ('' === document.getElementById('noteTitle').value) {
    document.getElementById("saveNoteBtn").setAttribute("disabled", true); //  document.all("submit").disabled=true;
  } else {
    document.getElementById("saveNoteBtn").removeAttribute('disabled');
  }

}

/**
 * detail值改变事件(判断)
 * @method detailFocus
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/23
 */
function detailFocus() {
  //如当前输入为空则禁止保存按钮,否则开启
  if ('' === document.getElementById('notes').value) {
    document.getElementById("saveNoteBtn").setAttribute("disabled", true); //  document.all("submit").disabled=true;
  } else {
    document.getElementById("saveNoteBtn").removeAttribute('disabled');
  }
}


/**
 * 根据唯一标识(笔记标题)到查出笔记详情
 * @method showDetail
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/24
 */
// function showDetail(noteTitle,noteType) {
//   if (0 === getAllNotes().length) {
//     alert('当前无任何笔记,请检查');
//     return;
//   } else if (undefined === noteTitle) {
//     alert('笔记标题为空哦,请检查');
//     return;
//   }
//   var noteDetail = {};
//   //遍历所有笔记,过滤出当前参数的笔记详情
//   for (var i = 0, arr = getAllNotes(); i < arr.length; i++) {
//     if (String(noteTitle) === arr[i].noteTitle) {
//       noteDetail = arr[i];
//       $("#noteContents").append('<div id="' + i + '"><a  href=\"#\"  onclick="showAddNote(\'update\')">点我修改</a><h2>' + noteDetail.noteTitle + '</h2>' +
//         '<p>' + noteDetail.noteContents + '</p></div>');
//       break;
//     }
//   }
// }
function showDetail(noteTitle,noteContents) {
  $("#noteContents").append('<div"><button id="editBtn"">点我修改</button><h2>' + noteTitle + '</h2>' +
    '<p>' + noteContents + '</p></div>');

}

/**
 * 关闭笔记详情DIV 待完成
 * @method closeNote
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/24
 */
function closeNote(type) {
 document.getElementById('addNote').style.display = 'none';
}

function setAllNotes(note) {
  //if (undefined !== allNoteList) {
  allNoteList = [];
  allNoteList.push(note);
  //}
  store.set('allNotes', allNoteList);
}

function getAllNotes() {
  return store.get('allNotes');
}



/**
 * 获得当前时间
 * @method getCurrentTime
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/23
 */
function getCurrentTime() {
  var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();

  return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
}