module.exports = {
  async loadInfo(identifier, Youtube) {
    return await Youtube.getInfo(identifier)
  },

  async searchSongs(identifier, Youtube, amount, uniqueVideo = true) {
    const { items } = await Youtube.search(identifier, undefined, amount)

    if (!items.length) throw new Error('No videos found.')
    if (!uniqueVideo) return items.map((video) => ({
      id: video.id.videoId,
      title: video.snippet.title
    }))

    const videos = await Youtube.videos(items.map((video) => video.id.videoId), 'contentDetails')
    const video = videos.find((video) => !video.contentDetails.regionRestriction)

    if (!video) throw new Error('Video contains region restriction.')

    return video && video.id
  }
}