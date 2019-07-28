$(function(){
  function buildHTML(message){
    var getImageTag = message.image.url !== null? `<img class="message__lower__image" src=${message.image.url}></img>`: ""
    var html = `<div class="message" data-message_id= "${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="message__lower">
                      <p class="message__lower__content">
                        ${message.content}
                      </p>
                      ${getImageTag}
                  </div>
                </div>`
    return html;
  }

  function buildMessageHTML(message){
    var getMessageContent = message.content?  `<p class="message__lower__content">
                                                 ${message.content}
                                               </p>`: ""
                                              
    var getMessageImage = message.image? `<img src= ${message.image.url} class="message__lower__image" >`: ""

    var html = `<div class="message" data-id=${message.id}>
                  <div class="message__upper-info">
                  <div class="message__upper-info__talker">
                    ${message.user_name}
                  </div>
                  <div class="message__upper-info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__lower"> 
                  ${getMessageContent}
                  ${getMessageImage}
                </div>`
    return html;
  };


  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert('入力内容が正しくありません');
      $('.submit-btn').attr('disabled', false);
    });
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if (location.pathname.search('groups/\[0-9]+\/messages') == 1 ){
      last_message_id = $('.message:last').data('message_id');
      var groupId = $('.main-header').data('group_id')
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: '/groups/' + groupId + '/api/messages' ,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: { id: last_message_id }
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages,function(index, message) {
          //メッセージが入ったHTMLを取得
          insertHTML = buildMessageHTML(message);
          //メッセージを追加
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        })
      })
      .fail(function() {
        alert('error');
      });
    }
  };

  setInterval(reloadMessages, 500);

});