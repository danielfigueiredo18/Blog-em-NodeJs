function confirmarDelecao(event, form){
    event.preventDefault();
    var decision = confirm("Deseja realmente excluir ?");
    if(decision){
        form.submit();
    }
}