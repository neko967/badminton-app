class SinglesRecord < ApplicationRecord
  has_many :singles_members, dependent: :destroy
end
