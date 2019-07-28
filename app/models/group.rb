class Group < ApplicationRecord

  has_many :group_users, dependent: :destroy 
  has_many :users, through: :group_users
  has_many :messages
  
  validates :name, presence: true, uniqueness: true
  def show_last_message
    if (last_message = messages.last).present?
      # 三項演算子の書き方
      # 条件式 ? trueの時の値 : falseの時の値
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
