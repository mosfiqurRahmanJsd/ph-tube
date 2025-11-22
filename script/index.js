const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showButtonCategories(data.categories))
}


const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => showVideo(data.videos))
}


const showButtonCategories = (items) => {

    const btnContainer = document.getElementById('button-container');

    items.forEach(item => {
        const btn = document.createElement('button');
        btn.classList.add('btn')
        btn.classList.add('btn-soft')
        btn.innerText = item.category;
        btnContainer.appendChild(btn);
    })
}


const showVideo = (videos) => {
    const videoContainer = document.getElementById('video-container'); 
    videos.forEach(video => {
        console.log(video); 

        const card = `
             <div class="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img src="${video.thumbnail}" alt="Shoes" />
                </figure>
                <div class="card-body flex flex-row gap-3">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold">${video.title}</h2>

                        <p class="flex gap-2.5">${video.authors[0].profile_name} <img class="w-5" src="./assets/463574.png" alt=""></p>

                        <p>${video.others.views}</p>
                    </div>
                </div>
            </div>
    
        `

        videoContainer.innerHTML = card; 
        
    })


}

loadCategories();
loadVideos(); 