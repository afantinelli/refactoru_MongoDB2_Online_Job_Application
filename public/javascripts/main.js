$(function(){
    $('#application-form').submit(function(event){
        event.preventDefault()
        $.post('/applicant', $('#application-form').serialize(), function(data){
        	console.log(data)
            if(data['success']==='Success!'){
                $('#success-message').removeClass('hidden');
            }
        })
    })
});