class Message < ApplicationRecord
  belongs_to :user   
  belongs_to :group    
  
  validation :content, presence: true, unless: :image?

end
