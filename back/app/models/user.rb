class User < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :singles_records, dependent: :destroy
  has_many :doubles_records, dependent: :destroy
end
