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

const loadCategoriesVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showVideo(data.category)); 

}


const showButtonCategories = (items) => {
    

    const btnContainer = document.getElementById('button-container');

    items.forEach(item => {
        
        const div = document.createElement('div'); 
        div.innerHTML = `
            <button onclick="loadCategoriesVideos(${item.category_id})" class="btn btn-soft">${item.category}</button>
        `

        btnContainer.append(div);
    })
}


const showVideo = (videos) => {
    const videoContainer = document.getElementById('video-container'); 
    videoContainer.innerHTML = ''; 
    videos.forEach(video => {
        // console.log(video); 

        const div = document.createElement('div'); 

        div.innerHTML = `
             <div class="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img src="${video.thumbnail}" alt="Shoes" />
                </figure>
                <div class="card-body flex flex-row gap-3">
                   
                       
                            <div>
                            <img class="w-15 rounded-full" src="${video.authors[0].profile_picture}" />
                            </div>
                       
                
                    <div>
                        <h2 class="text-xl font-bold">${video.title}</h2>

                        <p class="flex gap-2.5">${video.authors[0].profile_name} <img class="w-5" src="./assets/463574.png" alt=""></p>

                        <p>${video.others.views}</p>
                    </div>
                </div>
            </div>
    
        `

        videoContainer.appendChild(div);
        
    })


}

loadCategories();
loadVideos(); 