require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App004ChatSpace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    
    # 必要ないファイルを生成しないように設定
    config.generators do |g|
      g.stylesheets     false
      g.javascripts     false
      g.helper          false
      g.test_framework  false
    end

    # config.load_defaults 5.2
    # I18n.enforce_available_locales = true
    config.i18n.default_locale = :ja
  end
end
