class User < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :groups_joined_by_user, through: :user_groups, source: :group

  def self.find_with_jwt(encoded_token)
    decoded_token = JWT.decode(encoded_token,
                               Rails.application.credentials.secret_key_base,
                               true,
                               algorithm: 'HS256')
    payload = decoded_token.first
    find_by(id: payload['user_id'])
  rescue JWT::DecodeError
    nil
  end

  def join(group)
    groups_joined_by_user << group
  end

  def leave(group)
    groups_joined_by_user.destroy(group)
  end
end
