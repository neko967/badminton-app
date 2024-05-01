class DoublesRecord < ApplicationRecord
  belongs_to :user
  has_many :doubles_members, dependent: :destroy
end
