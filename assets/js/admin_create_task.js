


let searchReviewer= document.getElementById("searchReviewer");
let searchReviewee= document.getElementById("searchReviewee");
let reviewerContainer=document.getElementById("reviewerContainer");
let revieweeContainer=document.getElementById("revieweeContainer");
searchReviewer.addEventListener("keyup",(e)=>{
    let url="https://employee-review-system-employ.herokuapp.com/admin/getallemployeesApi"||"/admin/getAllEmployeesApi";
    let keyword=e.target.value.toLowerCase();
    reviewerContainer.innerHTML="";
    console.log(keyword);
    fetch(url).then(response=>response.json()).then(data=>{

        let users=data.data;
        console.log(users);
        for(let user of users){
            if(user.userName.toLowerCase().match(keyword)||user.userEmail.toLowerCase().match(keyword)||user.EID.toLowerCase().match(keyword)){

                let newCard=document.createElement("div");
                newCard.classList.add("card");
                newCard.classList.add("text-bg-success");
                // newCard.style.width="40vw";
                newCard.innerHTML=
                `
                <div>
                <input type="radio" id="user-reviewer-${user._id}" value="${user._id}"class="form-check-input" name="reviewer">
                <label class="form-check-label" for="user-reviewer-${user._id}">Email- ${user.userEmail} |</label>
                <label class="form-check-label" for="user-reviewer-${user._id}">EID- ${user.EID} |</label>
                <label class="form-check-label" for="user-reviewer-${user._id}">Name- ${user.userName} |</label>

                </div>
                
                `
                reviewerContainer.appendChild(newCard);
            }
        }
        
    })
});


searchReviewee.addEventListener("keyup",(e)=>{
    let url="/admin/getAllEmployeesApi";
    let keyword=e.target.value.toLowerCase();
    revieweeContainer.innerHTML="";
    console.log(keyword);
    fetch(url).then(response=>response.json()).then(data=>{
        let users=data.data;
        for(let user of users){
            if(user.userName.toLowerCase().match(keyword)||user.userEmail.toLowerCase().match(keyword)||user.EID.toLowerCase().match(keyword)){

                let newCard=document.createElement("div");
                newCard.classList.add("card");
                newCard.classList.add("text-bg-success");
                // newCard.style.width="40vw";
                newCard.innerHTML=
                `
                <div>
                <input type="radio" id="user-reviewee-${user._id}" value="${user._id}" class="form-check-input" name="reviewee">
                <label class="form-check-label" for="user-reviewee-${user._id}">Email- ${user.userEmail} |</label>
                <label class="form-check-label" for="user-reviewee-${user._id}">EID- ${user.EID} |</label>
                <label class="form-check-label" for="user-reviewee-${user._id}">Name- ${user.userName} |</label>

                </div>
                
                `
                revieweeContainer.appendChild(newCard);
            }
        }
        
    })
})