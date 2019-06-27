class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?

# public => どこからでもアクセス可能
# protected に設定されたメソッドは、そのメソッドを持つオブジェクトが self であるコンテキスト(メソッド定義式や instance_eval )でのみ呼び出せ ます。
# private   に設定されたメソッドは関数形式でしか呼び出せません。

  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

end
