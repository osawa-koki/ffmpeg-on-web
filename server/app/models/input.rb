# frozen_string_literal: true

class Input < ApplicationRecord
  has_one_attached :video

  has_one :output, dependent: :destroy

  def generate_gif
    update!(status: 'processing')
    tmp_input_file = create_tmp_input_file
    tmp_output_file = create_tmp_output_file
    ffmpeg(tmp_input_file:, tmp_output_file:)
    update!(status: 'completed')

    output = Output.create!(input_id: id)
    output.video.attach(io: File.open(tmp_output_file.path), filename: "#{SecureRandom.uuid}.gif")
  end

  def create_tmp_input_file
    uuid = SecureRandom.uuid
    tmp_file = Tempfile.new([uuid, ".#{ext}"])
    tmp_file.binmode
    tmp_file.write(video.download)
    tmp_file.rewind
    tmp_file
  end

  def create_tmp_output_file
    uuid = SecureRandom.uuid
    tmp_file = Tempfile.new([uuid, '.gif'])
    tmp_file.binmode
    tmp_file
  end

  def ffmpeg(tmp_input_file:, tmp_output_file:)
    commands = ['ffmpeg', '-i', tmp_input_file.path, '-r', '24', tmp_output_file.path, '-y']
    system(*commands)
  end
end
