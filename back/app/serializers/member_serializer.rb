class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :singles_strength, :doubles_strength
end
