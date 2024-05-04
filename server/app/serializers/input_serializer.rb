# frozen_string_literal: true

include Rails.application.routes.url_helpers

class InputSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :created_at, :updated_at, :video_url

  def video_url
    url_for(object.video) if object.video.attached?
  end
end
