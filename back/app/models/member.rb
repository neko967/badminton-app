class Member < ApplicationRecord
  belongs_to :user
  has_many :singles_players, dependent: :destroy
  has_many :singles_played_records, through: :singles_players, source: :singles_record
  has_many :doubles_players, dependent: :destroy
  has_many :doubles_played_records, through: :doubles_players, source: :doubles_record

  def history
    singles_records = self.singles_played_records.where.not(score_1: nil, score_2: nil).limit(5)
    doubles_records = self.doubles_played_records.where.not(score_12: nil, score_34: nil).limit(5)
    singles_and_doubles_records = singles_records + doubles_records
    sorted_records = member_singles_and_doubles_records.sort_by(&:updated_at).reverse.take(5)
    return sorted_records
  end
end
