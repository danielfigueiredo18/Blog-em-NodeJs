function confirmarDelecao(event, form){
    event.preventDefault();
    var decision = confirm("Deseja realmente exlcuir a categoria ?");
    if(decision){
        form.submit();
    }
}