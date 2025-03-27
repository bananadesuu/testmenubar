const fadeIns = document.querySelectorAll('.fade-in');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1, // 要素の10%が表示されたら発火
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // 一度表示されたら監視を解除
    }
  });
}, options);

fadeIns.forEach((fadeIn) => {
  observer.observe(fadeIn);
});

document.addEventListener('DOMContentLoaded', function() {
  const videoUrlInput = document.getElementById('videoUrl');
  const loadVideoButton = document.getElementById('loadVideo');
  const myVideo = document.getElementById('myVideo');
  const youtubeVideo = document.getElementById('youtubeVideo');

  loadVideoButton.addEventListener('click', function() {
    const videoUrl = videoUrlInput.value;
    if (videoUrl) {
      let videoId = '';
      if (videoUrl.includes('youtube.com')) {
        // YouTubeのURLから動画IDを抽出
        const urlParams = new URLSearchParams(videoUrl.split('?')[1]);
        videoId = urlParams.get('v');
      } else if (videoUrl.length === 11) {
        // 動画IDが直接入力された場合
        videoId = videoUrl;
      }

      if (videoId) {
        // YouTubeの動画を表示
        youtubeVideo.innerHTML = `<iframe width="640" height="360" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        youtubeVideo.style.display = 'block';
        myVideo.style.display = 'none';
      } else {
        // 通常の動画を表示
        myVideo.src = videoUrl;
        myVideo.style.display = 'block';
        youtubeVideo.style.display = 'none';
      }
    }
  });
});
