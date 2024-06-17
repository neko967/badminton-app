class SinglesPlayerSerializer < ActiveModel::Serializer
  attributes :id, :member_id, :singles_record_id
  belongs_to :singles_record
end
