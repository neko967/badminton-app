class SinglesRecordSerializer < ActiveModel::Serializer
  attributes :id, :player_1, :score_1, :player_2, :score_2
  has_many :singles_players
  has_many :singles_recorded_players
end
