# frozen_string_literal: true

include Rails.application.routes.url_helpers

class OutputSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :video_url

  def video_url
    url_for(object.video) if object.video.attached?
  end
end
