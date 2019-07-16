$(function(){

  var user_list = $("#user-search-result");
  var group_list = $('.chat-group-users');

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                </div>
                `
    user_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${msg}
                  </p>
                </div>
                `
    user_list.append(html);
  }

  function appendGroup(user){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                  <input id="group_user_ids" name="group[user_ids][]" type="hidden" value="${user.user_id}"></input>
                  <p class="chat-group-user__name">
                    ${user.user_name}
                  </p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                </div>
                `
    group_list.append(html);
  };

  $('#user-search-result').on('click', '.chat-group-user__btn', function(e){
    var dataId = $(this).data('user-id')
    var dataName = $(this).data('user-name')
    var user = { user_name: dataName, user_id: dataId }

    appendGroup(user);
  });

  $('.chat-group-users').on('click', '.chat-group-user__btn', function(e){
    var parent = $(this).parent();
    parent.empty(this);
  });

  $('#user-search-field').on('keyup', function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
        });
      } 
      else {
        appendErrMsgToHTML("ユーザー検索に失敗しました");
      }
    })
  })
});