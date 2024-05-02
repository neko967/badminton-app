class SinglesRecord < ApplicationRecord
  belongs_to :user
  has_many :singles_members, dependent: :destroy

  def player_1
    self.singles_members.first
  end

  def player_2
    self.singles_members.second
  end
end
