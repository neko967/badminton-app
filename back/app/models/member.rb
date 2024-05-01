class Member < ApplicationRecord
  belongs_to :user
  has_many :singles_members, dependent: :destroy
  has_many :doubles_members, dependent: :destroy
end
