class SinglesRecord < ApplicationRecord
  belongs_to :user
  has_many :singles_players, dependent: :destroy
end
