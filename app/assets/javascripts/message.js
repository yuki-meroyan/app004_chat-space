$(function(){
  function buildHTML(message){
    var getImageTag = message.image.url !== null? `<img class="message__lower__image" src=${message.image.url}></img>`: ""
    var html = `<div class="message">
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
});