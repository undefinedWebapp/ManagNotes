/***笔记类别begin***/

/**
 * 列出类别下的所有笔记列表 
 * @method showNoteList
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/24
 */
function showNoteList(noteType) {
  //根据默认笔记类别获取笔记数据
  var data = getNoteListByType(noteType);
  //笔记列表追加默认笔记数据
  $(".note-names").append('<li class="name-item"><a onclick="showDetailNote()"><h2>' + data.notes[0].noteTitle + '</h2>' +
    '<p>' + data.notes[0].noteContents + '</p></a></li>');
}

/*临时function,后续修改为通过传参调用showDetail()*/
function showDetailNote(noteTitle) {
  var data = getNoteListByType();
  $("#noteContents").append('<a  href=\"#\"  onclick="showAddNote()">点我修改</a><h2>' + data.notes[0].noteTitle + '</h2>' +
    '<p>' + data.notes[0].noteContents + '</p></li>');
}
/**
 * 设置默认数据 
 * @method getNoteListByType
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/24
 */
function getNoteListByType(noteType) {
  //模拟笔记列表数据,从
  return {
    noteType: 'JavaScript',
    notes: [{
      noteTitle: 'test',
      noteContents: 'JavaScript'
    }, {
      noteTitle: 'test',
      noteContents: 'JavaScript'
    }]
  };
}
/******/

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
function showAddNote(type) {
  console.log(type);
  //打开新增笔记输入区域并默认将焦点落到笔记标题上,且禁用保存按钮
  document.getElementById('addNote').style.display = 'block';
  document.getElementById('noteTitle').focus();
  document.getElementById("saveNote").setAttribute("disabled", true);

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
    document.getElementById("saveNote").setAttribute("disabled", true); //  document.all("submit").disabled=true;
  } else {
    document.getElementById("saveNote").removeAttribute('disabled');
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
    document.getElementById("saveNote").setAttribute("disabled", true); //  document.all("submit").disabled=true;
  } else {
    document.getElementById("saveNote").removeAttribute('disabled');
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
function saveNote() {
  //debugger
  //保存前再次跟踪title、detail字段是否为空
  if ('' === document.getElementById('noteTitle').value || '' === document.getElementById('notes').value) {
    document.getElementById("saveNote").setAttribute("disabled", true);
  } else {
    document.getElementById("saveNote").removeAttribute('disabled');
    var detailNote = {
      createTime: getCurrentTime(),
      updateTime: getCurrentTime(), //新增时最后修改时间为新建时间
      author: 'mozzie',
      noteType: '',
      noteTitle: document.getElementById('noteTitle').value,
      noteContents: store.get('notes')
    }; //新增的笔记对象
    store.set('newNotes', detailNote);

    document.getElementById('addNote').style.display = 'none'; //新增完后隐藏新增区域
    //像笔记列表追加新增的笔记
    $(".note-names").append('<li class="name-item"><a onclick="showDetail()"><h2>' + detailNote.noteTitle + '</h2>' +
      '<p>' + detailNote.noteContents + '</p></a></li>');
  }
}

/**
 * 显示具体某个笔记详情
 * @method showDetail
 * @for 所属类名
 * @param 
 * @return 
 * author zyHu
 * date 2015/07/24
 */
function showDetail() {
  
  $("#noteContents").append('<a  href=\"#\"  onclick="showAddNote(\'update\')">点我修改</a><h2>' + store.get('newNotes').noteTitle + '</h2>' +
    '<p>' + store.get('newNotes').noteContents + '</p></li>');
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
function closeNote (type) {
  $('#addNote').remove();
  $('#detailPanel').remove();
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