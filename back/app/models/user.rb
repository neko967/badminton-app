class User < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :groups_joined_by_user, through: :user_groups, source: :group

  def join(group)
    groups_joined_by_user << group
  end

  def leave(group)
    groups_joined_by_user.destroy(group)
  end
end
