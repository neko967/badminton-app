class Group < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :users_joining_to_group, through: :user_groups, source: :user
  has_many :members, dependent: :destroy
  has_many :singles_records, dependent: :destroy
  has_many :doubles_records, dependent: :destroy
end
