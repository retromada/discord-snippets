module.exports = {
  async loadInfo(identifier, Youtube) {
    return await Youtube.getInfo(identifier)
  },

  async searchSongs(identifier, Youtube) {
    const { items } = await Youtube.search(identifier, undefined, 3)
    const videos = await Youtube.videos(items.map((video) => video.id.videoId), 'contentDetails')
    const video = videos.find((video) => !video.contentDetails.regionRestriction)

    return video && video.id
  }
}