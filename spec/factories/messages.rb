
FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/7/ペンギン画像_03.jpg")}
    user
    group
  end
end