console.log('nani')
const deleteProduct = () => {
    
    const deleteBtnList = document.querySelectorAll('.delete-btn');
    if (deleteBtnList.length > 0) {
        const csrf = document.querySelector("[name='_csrf']").value;
      deleteBtnList.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', e => {
            e.preventDefault()
          const productId = e.target.getAttribute('data-productId');
          fetch(`/admin/delete-product/${productId}`, {
            method: 'DELETE',
            headers: {
              'csrf-token': csrf
            }
          })
            .then(response => {
              return response.json();
            })
            .then(response => {
              if (response.msg === 'product deleted') {
                const selectedProduct = document.querySelector(`#post-${productId}`);
                selectedProduct.remove();
              }
            });
        });
      });
    }
  };

  deleteProduct()