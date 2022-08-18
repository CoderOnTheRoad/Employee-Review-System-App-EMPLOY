let editButtons= document.getElementsByClassName("edit-button");
for(let button of editButtons){
    button.addEventListener("click",function(){
        let userId=button.getAttribute("data-employeeId");
        let submitButton=document.getElementById(`submitButton-${userId}`);
        submitButton.style.display="block";
        button.style.display="none";
        let inputs=document.getElementsByClassName(`input-${userId}`);
        // console.log(inputs);
        for(let input of inputs){
            input.readOnly=false;
        }
    })
}