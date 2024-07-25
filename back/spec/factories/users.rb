FactoryBot.define do
  factory :user do
    provider { 'google' }
    uid { Faker::Number.between(from: 11, to: 11) }
  end
end
