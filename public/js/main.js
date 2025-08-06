document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    const popUpContainer = document.querySelector('.pop-up-container');
    const popUp = document.querySelector('.pop-up');
    const cancelBtn = document.querySelector('#cancel-btn');
    const updateBtn = document.querySelector('#update-btn');
    const editCancelBtn = document.querySelector('#cancel-edit-btn');
    const popUpEditContainer = document.querySelector('.edit-pop-up-container');

    // Botão para abrir o pop-up de 'Adicionar'
    addButton.addEventListener('click', () => {
        popUpContainer.style.display = 'flex';
        popUp.style.display = 'block';
    });

    // Botão para fechar o pop-up de 'Adicionar'
    cancelBtn.addEventListener('click', () => {
        popUpContainer.style.display = 'none';
        // A linha abaixo não é necessária se o contêiner já estiver oculto
        // popUp.style.display = 'none';
    });

    // Botão para fechar o pop-up de 'Editar'
    editCancelBtn.addEventListener('click', () => {
        popUpEditContainer.style.display = 'none';
    });

    // Botão 'Update' do pop-up de edição para fechar
    updateBtn.addEventListener('click', () => {
        // A lógica de envio do formulário fará o redirecionamento
        // Então não precisamos esconder o pop-up aqui.
        // O `form` já fará o submit.
    });

    // Adiciona listener para todos os botões de 'Deletar'
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                fetch('/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ index })
                })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        alert('Erro ao deletar o contato');
                    }
                })
                .catch(error => console.error('Erro:', error));
            }
        });
    });

    // Adiciona listener para os botões de 'Editar'
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const index = Array.from(row.parentNode.children).indexOf(row);
            const name = row.cells[0].textContent;
            const email = row.cells[1].textContent;
            const phone = row.cells[2].textContent;

            // Preenche o formulário de edição
            document.getElementById('edit-index').value = index;
            document.getElementById('edit-name').value = name;
            document.getElementById('edit-email').value = email;
            document.getElementById('edit-phone').value = phone;

            // Exibe o pop-up de edição
            popUpEditContainer.style.display = 'flex';
        });
    });
});