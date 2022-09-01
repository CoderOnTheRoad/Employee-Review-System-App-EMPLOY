let editButtons= document.getElementsByClassName("edit-button");
for(let button of editButtons){
    button.addEventListener("click",function(){
        let reviewId=button.getAttribute("data-reviewId");
        let tableDataSubmit=document.getElementById(`table-data-submit-${reviewId}`);
        let tableDataEdit=document.getElementById(`table-data-edit-${reviewId}`);
        let submitButton=document.getElementById(`submitButton-${reviewId}`);
        tableDataSubmit.style.display="block";
        submitButton.style.display="block";
        button.style.display="none";
        tableDataEdit.style.display="none";
        let inputs=document.getElementsByClassName(`input-${reviewId}`);
        // console.log(inputs);
        for(let input of inputs){
            input.readOnly=false;
        }
    })
}