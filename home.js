let url = `https://youtube.googleapis.com/youtube/v3/activities?key=AIzaSyDLilZsguUPoimp_3YjBP5izMvITu0MOIs&part=snippet&Home=true`

let url2 = `https://youtube.googleapis.com/youtube/v3/channels?key=AIzaSyDLilZsguUPoimp_3YjBP5izMvITu0MOIs&part=snippet&id=UCGyZg4DZmWyj0q3H3IY15EA`

const itemDiv = document.getElementsByClassName('items')[0]
const searchBtn = document.querySelector('.search-bar .material-symbols-outlined')
const searchField = document.querySelector('.search-bar .search-field')

async function loadHomeApi(){
    // Search with 21 results
    let url = `https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyAT_Vy68oGRZqBtFhhxj4VmbcuSyF-RK0M&part=snippet&maxResults=21`
    
    const response = await fetch(url)
    const videoList = await response.json()
    
    loadHomePage(videoList.items)
}

async function loadChannelApi(channelId){

    let url = `https://youtube.googleapis.com/youtube/v3/channels?key=AIzaSyAT_Vy68oGRZqBtFhhxj4VmbcuSyF-RK0M&part=snippet&id=${channelId}`

    let response = await fetch(url)
    let channelDetails = await response.json()

    return channelDetails.items[0].snippet.thumbnails.high.url
}

function loadHomePage(videoList){
    videoList.forEach(async (element) => {
        let card = document.createElement('div')
        card.className = 'single-item'

        let channelIcon = await loadChannelApi(element.snippet.channelId)
        let item = `
        <div class="video">
            <img src=${element.snippet.thumbnails.high.url} alt="">
        </div>
        <div class="video-details">
            <div class="channel-icon">
                <img src="${channelIcon}" alt="">
            </div>
            <div class="description">
                <p class="video-title">${element.snippet.title}</p>
                <p class="channel-title">${element.snippet.channelTitle}</p>
                <span class="video-views">2.8M views</span>
                <span class="publish-time">2023-06-22</span>
            </div>
            <div class="more-btn">
                <span class="material-symbols-outlined">
                    more_vert
                </span>
            </div>
        </div>
        `

        card.innerHTML = item
        itemDiv.appendChild(card)
    });
}

loadHomeApi()

async function loadSearchApi(content){

    let url = `https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyAT_Vy68oGRZqBtFhhxj4VmbcuSyF-RK0M&part=snippet&maxResults=21&q=${content}`

    const response = await fetch(url)
    const videoList = await response.json()

    itemDiv.querySelectorAll('*').forEach(child => child.remove());

    loadHomePage(videoList.items)
}

searchBtn.addEventListener('click',() => {
    loadSearchApi(searchField.value)
})

searchField.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        loadSearchApi(searchField.value)
    }
})