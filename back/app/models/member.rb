class Member < ApplicationRecord
  belongs_to :user
  has_many :singles_players, dependent: :destroy
  has_many :doubles_players, dependent: :destroy
end
