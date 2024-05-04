class SinglesRecord < ApplicationRecord
  belongs_to :user
  has_many :singles_players, dependent: :destroy
  has_many :singles_recored_players, through: :singles_players, source: :member
end
