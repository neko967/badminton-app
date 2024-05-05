class DoublesRecord < ApplicationRecord
  belongs_to :user
  has_many :doubles_players, dependent: :destroy
  has_many :doubles_recored_players, through: :doubles_players, source: :member
end
