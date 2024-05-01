class DoublesRecord < ApplicationRecord
  has_many :doubles_members, dependent: :destroy
end
