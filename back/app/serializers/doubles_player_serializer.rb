class DoublesPlayerSerializer < ActiveModel::Serializer
  attributes :id, :member_id, :doubles_record_id
  belongs_to :doubles_record
end
