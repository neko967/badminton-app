class DoublesRecord < ApplicationRecord
  encrypts :player_1
  encrypts :player_2
  encrypts :player_3
  encrypts :player_4

  belongs_to :group
  has_many :doubles_players, dependent: :destroy
  has_many :doubles_recorded_players, through: :doubles_players, source: :member
end
