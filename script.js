const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");
const button = document.getElementsByClassName('btn')[0];
const getUser = async(username) => {
    fetch(APIURL + username).then(response => response.json()).then((data)=>{
        console.log(data)
        if(!(data.message == "Not Found")){
            const card = `
                <div class="userCard">
                    <div>
                        <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
                    </div>
                    <div class="user_info">
                        <h2><a href="${data.html_url}" target="_blank">${data.name}</a></h2>
                        <p>${data.bio}</p>
        
                        <ul class="info">
                            <li>${data.followers}<strong>Followers</strong></li>
                            <li>${data.following}<strong>Following</strong></li>
                            <li>${data.public_repos}<strong>Repos</strong></li>
                        </ul>
        
                        <div id="repos">
                          
                        </div>
                    </div>
                </div>
            `
            main.innerHTML = card;
            getRepos(username)
        }
        else{
            main.innerHTML = `
            <div class="userCard">
                <div>
                    <img class="avatar" src="./Images/blank-profile-picture.png" alt="Florin Pop">
                </div>
                <div class="user_info active">
                    <div>User Not Found</div>
                </div>
            </div>`
        }
    }).catch(error=>{
        console.log(error);
    });
}


// init call
getUser("Dip2259")


const getRepos = async(username) => {
    const repos = document.querySelector("#repos")
    fetch(APIURL + username + "/repos").then(response=>response.json()).then((data)=>{
        data.forEach(
            (item) => {
    
                const elem = document.createElement("a")
                elem.classList.add("repo")
                elem.href = item.html_url
                elem.innerText = item.name
                elem.target = "_blank"
                repos.appendChild(elem)
            }
        )
    }).catch(error=>{
        console.log(error);
    })
}

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}


button.addEventListener(
        "click",
        function() {
            formSubmit()
        }
    )