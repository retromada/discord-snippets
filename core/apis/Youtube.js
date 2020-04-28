const { google } = require('googleapis')

module.exports = {
  load() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    })

    return this
  },

  videos(ids, part = 'snippet,statistics') {
    return this.youtube.videos.list({ id: ids.join(), part }).then((response) => response && response.data.items)
  },

  search(query, part = 'snippet', maxResults = 10) {
    return this._search(query, 'video', part, 'relevance', maxResults)
  },

  _search(query, type = 'video', part = 'snippet', order = 'relevance', maxResults = 5) {
    return this.youtube.search.list({ q: query, type, part, order, maxResults }).then((response) => response.data)
  }
}