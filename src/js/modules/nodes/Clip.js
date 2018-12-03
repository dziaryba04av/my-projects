export function Clip(data) {
  const  clipContainer = document.createElement('li');
  const clip = document.createElement('div');
  const clipPreview = document.createElement('div');
  const clipTitle = document.createElement('div');
  const clipLink = document.createElement('a');
  const clipChannel = document.createElement('div');
  const clipDate = document.createElement('div');
  const clipCounter = document.createElement('div');
  const clipDescription = document.createElement('div');

  clip.className = 'clip';
  clipPreview.className = 'clip-preview';
  clipTitle.className = 'clip-title';
  clipLink.href = `https://www.youtube.com/watch?v=${data.id}`;
  clipLink.target = '_blank';
  clipPreview.style.backgroundImage = `url(${data.snippet.thumbnails.medium.url})`;
  clipChannel.className = 'clip-channel';
  clipChannel.appendChild(document.createTextNode(`Channel: ${data.snippet.channelTitle}`));
  clipDate.className = 'clip-date';
  clipDate.appendChild(document.createTextNode(`Date: ${data.snippet.publishedAt.substring(0,10)}`));
  clipCounter.className = 'clip-counter';
  clipCounter.appendChild(document.createTextNode(`Views: ${data.statistics.viewCount}`));
  clipDescription.className = 'clip-description';
  clipDescription.appendChild(document.createTextNode(data.snippet.description));
  clipDescription.className = 'clip-description';
  clipDescription.appendChild(document.createTextNode(data.snippet.description));

  clipLink.appendChild(document.createTextNode(data.snippet.title))
  clipTitle.appendChild(clipLink)
  clipPreview.appendChild(clipTitle);
  clip.appendChild(clipPreview);
  clip.appendChild(clipChannel);
  clip.appendChild(clipDate);
  clip.appendChild(clipCounter);
  clip.appendChild(clipDescription);
  clipContainer.appendChild(clip);

  return clipContainer;
}