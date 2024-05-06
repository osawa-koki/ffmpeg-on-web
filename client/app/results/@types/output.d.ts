interface Output {
  id: number
  created_at: string
  updated_at: string
  video_url: string
  input: {
    id: number
    ext: string
    status: string
  }
  source_video_url: string
}
