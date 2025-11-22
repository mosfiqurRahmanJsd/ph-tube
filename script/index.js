
const removeActiveClass = () => {
    const activeBtn = document.getElementsByClassName('active'); 
    for(btn of activeBtn) {
        btn.classList.remove('active'); 
    }
}



const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showButtonCategories(data.categories))
}


const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById('all-btn').classList.add('active'); 
            showVideo(data.videos)
        })
}


const displayVideoDetails = (video) => {
    
    document.getElementById('video_details').showModal(); 
    const detailsContainer = document.getElementById('details'); 
    detailsContainer.innerHTML = `
        <h2 class="text-2xl">${video.video.description}</h2>
    `
}



const loadVideoDetails =(id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data))
}



const loadCategoriesVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass(); 
            const clickedBtn = document.getElementById(id); 
            clickedBtn.classList.add('active')
             showVideo(data.category)
        });

}


const showButtonCategories = (items) => {


    const btnContainer = document.getElementById('button-container');

    items.forEach(item => {
        
        const div = document.createElement('div');
        div.innerHTML = `
            <button id="${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn btn-soft">${item.category}</button>
        `

        btnContainer.append(div);
    })
}


const showVideo = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    if (videos.length === 0) {
        videoContainer.innerHTML = `
            <div class="col-span-full ju" >
                <div class="mt-46 ">
                    <img class="mx-auto mb-5" src="./assets/Icon.png" alt="">
                    <h2 class="text-4xl text-center font-black">Oops!! Sorry, There is no content here</h2>
                </div>
            </div>
        `;
        return;
    }


    videos.forEach(video => {
        // console.log(video.video_id); 

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

                        <p class="flex gap-2.5">${video.authors[0].profile_name} ${video.authors[0].verified == true ? `<img class="w-5" src="./assets/463574.png" alt="">`: ''}</p>

                        <p>${video.others.views}</p>
                    </div>
                </div>
                <button class="btn btn-block" onclick="loadVideoDetails('${video.video_id}')">Show Details</button>
            </div>
    
        `

        videoContainer.appendChild(div);

    })


}

document.getElementById('search-input').addEventListener('keyup', function(event) {
    const input = event.target.value; 
    
    loadVideos(input); 
    

})



loadCategories();
loadVideos(); 