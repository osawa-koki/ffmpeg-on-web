# frozen_string_literal: true

class Output < ApplicationRecord
  has_one_attached :video

  belongs_to :input
end
