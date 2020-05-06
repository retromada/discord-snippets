module.exports = {
  async loadInfo(identifier, Youtube) {
    return await Youtube.getInfo(identifier)
  },

  async searchSongs(identifier, Youtube) {
    const { items } = await Youtube.search(identifier, undefined, 3)

    if (!items.length) throw new Error('No videos found.')

    const videos = await Youtube.videos(items.map((video) => video.id.videoId), 'contentDetails')
    const video = videos.find((video) => !video.contentDetails.regionRestriction)

    if (!video) throw new Error('Video contains region restriction.')

    return video && video.id
  }
}