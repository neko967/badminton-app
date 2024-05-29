class User < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :groups_joined_by_user, through: :user_groups, source: :group
end
