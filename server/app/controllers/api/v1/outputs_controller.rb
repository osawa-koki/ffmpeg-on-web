# frozen_string_literal: true

module Api
  module V1
    class OutputsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def index
        outputs = Output.includes(:input, :video_attachment).where(input: { user_id: current_api_v1_user.id })
        render json: outputs, each_serializer: OutputSerializer
      end
    end
  end
end
