# frozen_string_literal: true

module Api
  module V1
    class InputsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def index
        inputs = Input.includes(:video_attachment).where(user_id: current_api_v1_user.id).order(created_at: :desc)
        render json: inputs, each_serializer: InputSerializer
      end

      def create
        input = Input.new(input_params)
        input.user_id = current_api_v1_user.id
        input.video.attach(params[:video])
        if input.save
          render json: input, serializer: InputSerializer
        else
          render json: { errors: input.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        input = Input.find(params[:id])
        render json: input, serializer: InputSerializer
      end

      def destroy
        input = Input.find(params[:id])
        input.destroy
        render json: input
      end

      private

      def input_params
        params.permit(:name)
      end
    end
  end
end
