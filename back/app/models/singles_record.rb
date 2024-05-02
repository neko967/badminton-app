class SinglesRecord < ApplicationRecord
  belongs_to :user
  has_many :singles_members, dependent: :destroy

  def player_1
    self.singles_members.first.member.name
  end

  def player_2
    self.singles_members.second.member.name
  end
end
