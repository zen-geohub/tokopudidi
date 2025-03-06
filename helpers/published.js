function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;
  if (interval > 1) {
      return `Updated ${Math.floor(interval)} years ago`;
  }

  interval = seconds / 2592000;
  if (interval > 1) {
      return `Updated ${Math.floor(interval)} months ago`;
  }

  interval = seconds / 86400;
  if (interval > 1) {
      return `Updated ${Math.floor(interval)} days ago`;
  }

  interval = seconds / 3600;
  if (interval > 1) {
      return `Updated ${Math.floor(interval)} hours ago`;
  }

  interval = seconds / 60;
  if (interval > 1) {
      return `Updated ${Math.floor(interval)} minutes ago`;
  }

  return `Updated ${Math.floor(seconds)} seconds ago`;
}

module.exports = timeSince;
