class SinglesRecord < ApplicationRecord
  encrypts :player_1
  encrypts :player_2

  belongs_to :group
  has_many :singles_players, dependent: :destroy
  has_many :singles_recorded_players, through: :singles_players, source: :member
end
