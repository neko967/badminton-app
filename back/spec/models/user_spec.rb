require 'rails_helper'

RSpec.describe User, type: :model do
  # バリデーションのテスト
  describe 'validation' do
    context 'when normal' do
      # uidとproviderがあれば、有効であること
      it 'is valid with a name and email' do
        user = build(:user)
        expect(user).to be_valid
      end
    end

    context 'when abnormal' do
      # uidがなければ、無効であること
      it 'is invalid without a uid' do
        user = build(:user, uid: nil)
        expect(user).not_to be_valid
      end

      # providerがなければ、無効であること
      it 'is invalid without a provider' do
        user = build(:user, provider: nil)
        expect(user).not_to be_valid
      end

      # 重複したuidなら無効であること
      it 'is invalid with a duplicate email address' do
        create(:user, uid: '01010101010')
        user = build(:user, uid: '01010101010')
        expect(user).not_to be_valid
      end
    end
  end
end
