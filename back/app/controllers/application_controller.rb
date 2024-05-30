class ApplicationController < ActionController::API

  private

  def set_current_user
    if request.headers['uid'].present?
      uid = request.headers['uid']
      @current_user = User.find_by(uid: uid)
    end
  end

  def set_current_group
    slug = request.headers['slug']
    @current_group = Group.find_by(slug: slug)
  end
end
