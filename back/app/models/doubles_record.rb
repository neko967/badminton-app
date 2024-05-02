class DoublesRecord < ApplicationRecord
  belongs_to :user
  has_many :doubles_players, dependent: :destroy
end
