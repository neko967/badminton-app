class SinglesRecord < ApplicationRecord
  belongs_to :user
  has_many :singles_members, dependent: :destroy
end
