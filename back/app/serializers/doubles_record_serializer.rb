class DoublesRecordSerializer < ActiveModel::Serializer
  attributes :id, :player_1, :player_2, :score_12, :player_3, :player_4, :score_34
  has_many :doubles_recorded_players
end
