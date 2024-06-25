class Member < ApplicationRecord
  encrypts :name

  belongs_to :group
  has_many :singles_players, dependent: :destroy
  has_many :singles_played_records, through: :singles_players, source: :singles_record
  has_many :doubles_players, dependent: :destroy
  has_many :doubles_played_records, through: :doubles_players, source: :doubles_record
  validates :name, length: { maximum: 255 }, presence: true

  def history
    singles_records = self.singles_played_records.select { |record| record.score_1.present? && record.score_2.present? }.first(5)
    doubles_records = self.doubles_played_records.select { |record| record.score_12.present? && record.score_34.present? }.first(5)
    singles_and_doubles_records = singles_records + doubles_records
    sorted_records = singles_and_doubles_records.sort_by(&:updated_at).reverse.take(5)
    return sorted_records
  end
end
