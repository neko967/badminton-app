class Member < ApplicationRecord
  belongs_to :user
  has_many :singles_players, dependent: :destroy
  has_many :singles_played_records, through: :singles_players, source: :singles_record
  has_many :doubles_players, dependent: :destroy

  def history
    self.singles_played_records.where.not(score_1: nil, score_2: nil).order(updated_at: :desc).limit(5)
  end
end
