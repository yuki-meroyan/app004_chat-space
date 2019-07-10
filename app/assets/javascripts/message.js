$(function(){
  function buildHTML(message){
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
                      </p>`
    if (message.image.url != null){
      var html = html + `<img class="message__lower__image" src=${message.image.url}>
                          </img>
                          </div>
                        </div>`
    } else{                  
      var html = html + `</div>
                         </div>`
    }            
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
      $('#message_content').val('');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert('入力内容が正しくありません');
      $('.submit-btn').attr('disabled', false);
    });
  })
});